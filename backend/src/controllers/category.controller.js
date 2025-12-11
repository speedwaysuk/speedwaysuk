import Category from '../models/category.model.js';
import { deleteFromCloudinary, uploadImageToCloudinary } from '../utils/cloudinary.js';

/**
 * @desc    Create a new category
 * @route   POST /api/v1/admin/categories
 * @access  Private/Admin
 */
export const createCategory = async (req, res) => {
    try {
        const admin = req.user;
        const { 
            name, 
            description, 
            isActive = true, 
            order = 0,
        } = req.body;

        // Validate required fields
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ 
            $or: [
                { name: name.trim() },
                { slug: name.trim().toLowerCase().replace(/\s+/g, '-') }
            ]
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category with this name already exists'
            });
        }

        // Handle icon upload
        let iconData = null;
        if (req.files && req.files.icon) {
            const iconFile = req.files.icon[0];
            try {
                const result = await uploadImageToCloudinary(
                    iconFile.buffer,
                    `category-icons/${Date.now()}`,
                    'category-icons'
                );
                iconData = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    filename: iconFile.originalname
                };
            } catch (uploadError) {
                console.error('Icon upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload icon'
                });
            }
        }

        // Handle image upload
        let imageData = null;
        if (req.files && req.files.image) {
            const imageFile = req.files.image[0];
            try {
                const result = await uploadImageToCloudinary(
                    imageFile.buffer,
                    `category-images/${Date.now()}`,
                    'category-images'
                );
                imageData = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    filename: imageFile.originalname
                };
            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload category image'
                });
            }
        }

        // Create category
        const category = await Category.create({
            name: name.trim(),
            description: description?.trim() || '',
            icon: iconData,
            image: imageData,
            isActive: isActive === 'true' || isActive === true,
            order: parseInt(order) || 0,
            createdBy: admin._id
        });

        await category.updateAuctionCount();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create category'
        });
    }
};

/**
 * @desc    Get all categories
 * @route   GET /api/v1/admin/categories
 * @access  Private/Admin
 */
export const getAllCategories = async (req, res) => {
    try {
        const { 
            search = '', 
            isActive, 
            page = 1, 
            limit = 20,
            sortBy = 'order',
            sortOrder = 'asc'
        } = req.query;

        // Build filter
        const filter = {};
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Sort
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Get categories
        const categories = await Category.find(filter)
            .populate('createdBy', 'username email')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const totalCategories = await Category.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                categories,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalCategories / limit),
                    totalCategories,
                    hasNextPage: skip + categories.length < totalCategories,
                    hasPrevPage: skip > 0
                }
            }
        });
    } catch (error) {
        console.error('Get all categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};

/**
 * @desc    Get category by ID
 * @route   GET /api/v1/admin/categories/:id
 * @access  Private/Admin
 */
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id)
            .populate('createdBy', 'username email');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Get category by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch category'
        });
    }
};

/**
 * @desc    Update category
 * @route   PUT /api/v1/admin/categories/:id
 * @access  Private/Admin
 */
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            description, 
            isActive, 
            order,
            removeIcon = false,
            removeImage = false 
        } = req.body;

        // Find category
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Handle icon removal if requested
        if (removeIcon === 'true' || removeIcon === true) {
            if (category.icon && category.icon.publicId) {
                await deleteFromCloudinary(category.icon.publicId, 'image');
            }
            category.icon = null;
        }

        // Handle image removal if requested
        if (removeImage === 'true' || removeImage === true) {
            if (category.image && category.image.publicId) {
                await deleteFromCloudinary(category.image.publicId, 'image');
            }
            category.image = null;
        }

        // Handle icon upload/replacement
        if (req.files && req.files.icon) {
            const iconFile = req.files.icon[0];
            try {
                // Delete old icon from Cloudinary if exists
                if (category.icon && category.icon.publicId) {
                    await deleteFromCloudinary(category.icon.publicId, 'image');
                }
                
                const result = await uploadImageToCloudinary(
                    iconFile.buffer,
                    `category-icons/${Date.now()}`,
                    'category-icons'
                );
                category.icon = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    filename: iconFile.originalname
                };
            } catch (uploadError) {
                console.error('Icon upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload icon'
                });
            }
        }

        // Handle image upload/replacement
        if (req.files && req.files.image) {
            const imageFile = req.files.image[0];
            try {
                // Delete old image from Cloudinary if exists
                if (category.image && category.image.publicId) {
                    await deleteFromCloudinary(category.image.publicId, 'image');
                }
                
                const result = await uploadImageToCloudinary(
                    imageFile.buffer,
                    `category-images/${Date.now()}`,
                    'category-images'
                );
                category.image = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    filename: imageFile.originalname
                };
            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to upload category image'
                });
            }
        }

        // Update other fields
        if (name) category.name = name.trim();
        if (description !== undefined) category.description = description.trim();
        if (isActive !== undefined) category.isActive = isActive === 'true' || isActive === true;
        if (order !== undefined) category.order = parseInt(order) || 0;

        await category.save();

        // Update auction count
        await category.updateAuctionCount();

        const updatedCategory = await Category.findById(id)
            .populate('createdBy', 'username email');

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: {
                category: updatedCategory
            }
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update category'
        });
    }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/v1/admin/categories/:id
 * @access  Private/Admin
 */
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Check if category has auctions
        const Auction = (await import('../models/auction.model.js')).default;
        const auctionCount = await Auction.countDocuments({ 
            category: category.name,
            status: { $ne: 'draft' }
        });

        if (auctionCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. There are ${auctionCount} active auctions in this category.`
            });
        }

        // Delete images from Cloudinary
        if (category.icon && category.icon.publicId) {
            await deleteFromCloudinary(category.icon.publicId, 'image');
        }
        if (category.image && category.image.publicId) {
            await deleteFromCloudinary(category.image.publicId, 'image');
        }

        // Delete category
        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category'
        });
    }
};

/**
 * @desc    Toggle category status (Active/Inactive)
 * @route   PATCH /api/v1/admin/categories/:id/toggle-status
 * @access  Private/Admin
 */
export const toggleCategoryStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.status(200).json({
            success: true,
            message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
            data: {
                category
            }
        });
    } catch (error) {
        console.error('Toggle category status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle category status'
        });
    }
};

/**
 * @desc    Get category tree (for dropdowns)
 * @route   GET /api/v1/admin/categories/tree
 * @access  Private/Admin
 */
export const getCategoryTree = async (req, res) => {
    try {
        const tree = await Category.getCategoryTree();
        
        res.status(200).json({
            success: true,
            data: {
                tree
            }
        });
    } catch (error) {
        console.error('Get category tree error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch category tree'
        });
    }
};

/**
 * @desc    Get active categories for public display
 * @route   GET /api/v1/categories/public/active
 * @access  Public
 */
export const getActiveCategories = async (req, res) => {
    try {
        const categories = await Category.find({ 
            isActive: true,
            icon: { $exists: true, $ne: null }
        })
        .select('name slug icon.url order')
        .sort({ order: 1, name: 1 })
        .limit(9); // Limit to 9 categories to make room for Explore

        // Format categories exactly like your original
        const formattedCategories = categories.map(category => ({
            name: category.name,
            icon: category.icon?.url || '',
            type: 'img',
            slug: category.slug,
        }));

        // Add Explore as the 10th item
        formattedCategories.push({
            name: 'Explore',
            icon: '',
            type: 'svg',
        });

        res.status(200).json({
            success: true,
            data: formattedCategories
        });
    } catch (error) {
        console.error('Get active categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};

/**
 * @desc    Get active categories for public display (with images)
 * @route   GET /api/v1/categories/public/with-images
 * @access  Public
 */
export const getCategoriesWithImages = async (req, res) => {
    try {
        const categories = await Category.find({ 
            isActive: true,
            image: { $exists: true, $ne: null }, // Only categories with images
            'image.url': { $exists: true, $ne: '' } // Ensure image URL exists
        })
        .select('name slug image order auctionCount')
        .sort({ order: 1, name: 1 })
        .limit(20); // Limit to 10 categories

        // Format categories for frontend
        const formattedCategories = categories.map(category => ({
            name: category.name,
            slug: category.slug,
            image: category.image?.url,
            order: category.order,
            auctionCount: category.auctionCount
        }));

        res.status(200).json({
            success: true,
            data: formattedCategories
        });
    } catch (error) {
        console.error('Get categories with images error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
};
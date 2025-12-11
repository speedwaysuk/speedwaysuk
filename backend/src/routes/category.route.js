import express from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    getCategoryTree,
    getActiveCategories,
    getCategoriesWithImages
} from '../controllers/category.controller.js';
import { auth, authAdmin } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/public/active', getActiveCategories);
categoryRouter.get('/public/with-images', getCategoriesWithImages);

// Admin category management routes
categoryRouter.post('/', 
    auth, 
    authAdmin, 
    upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]), 
    createCategory
);

categoryRouter.get('/', auth, authAdmin, getAllCategories);
categoryRouter.get('/tree', auth, authAdmin, getCategoryTree);
categoryRouter.get('/:id', auth, authAdmin, getCategoryById);

categoryRouter.put('/:id', 
    auth, 
    authAdmin, 
    upload.fields([
        { name: 'icon', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]), 
    updateCategory
);

categoryRouter.delete('/:id', auth, authAdmin, deleteCategory);
categoryRouter.patch('/:id/toggle-status', auth, authAdmin, toggleCategoryStatus);

export default categoryRouter;
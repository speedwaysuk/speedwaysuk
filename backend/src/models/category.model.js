import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      url: String,
      publicId: String,
      filename: String,
    },
    image: {
      url: String,
      publicId: String,
      filename: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    auctionCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name before saving
categorySchema.pre("validate", function (next) {
  // Always generate slug during validation, not just save
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

categorySchema.pre("save", function (next) {
  // Double-check on save
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Indexes for better performance
// categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });

// Method to update auction count
categorySchema.methods.updateAuctionCount = async function () {
  const Auction = model("Auction");
  const count = await Auction.countDocuments({
    category: this.slug,
    status: { $ne: "draft" },
  });
  this.auctionCount = count;
  return this.save();
};

// Method to get active categories
categorySchema.statics.getActiveCategories = function () {
  return this.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();
};

// Method to get category tree
categorySchema.statics.getCategoryTree = async function () {
  const categories = await this.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();

  // Build tree structure
  const categoryMap = {};
  const roots = [];

  // First pass: store all categories in map
  categories.forEach((category) => {
    category.children = [];
    categoryMap[category._id] = category;
  });

  // Second pass: build tree
  categories.forEach((category) => {
    if (category.parentCategory) {
      const parent =
        categoryMap[category.parentCategory._id || category.parentCategory];
      if (parent) {
        parent.children.push(category);
      }
    } else {
      roots.push(category);
    }
  });

  return roots;
};

const Category = model("Category", categorySchema);
export default Category;

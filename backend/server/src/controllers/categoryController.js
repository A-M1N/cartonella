import prisma from "../lib/prisma.js";

// @route   GET /api/categories
// @desc    Get all categories (with hierarchy)
export const getCategories = async (req, res) => {
  try {
    const { level } = req.query;

    const where = {};
    if (level) {
      where.level = parseInt(level);
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
        children: {
          include: {
            _count: {
              select: { products: true },
            },
            children: {
              include: {
                _count: {
                  select: { products: true },
                },
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/categories/main
// @desc    Get main categories with their subcategories and brands (for navigation)

export const getMainCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { level: 1 },
      include: {
        children: {
          include: {
            children: true, // Brands (level 3)
          },
        },
      },
      orderBy: { name: "asc" },
    });

    res.json(categories);
  } catch (error) {
    console.error("Get main categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/categories/:slug
// @desc    Get category by slug with products
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: true,
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Get category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/categories/:slug/products
// @desc    Get all products in a category (including subcategories)
export const getCategoryProducts = async (req, res) => {
  try {
    const { slug } = req.params;
    const { sort, limit = 20, page = 1 } = req.query;

    // Find the category
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Collect all category IDs (current + all descendants)
    const categoryIds = [category.id];

    const collectChildIds = (children) => {
      children.forEach((child) => {
        categoryIds.push(child.id);
        if (child.children) {
          collectChildIds(child.children);
        }
      });
    };

    collectChildIds(category.children || []);

    // Build sort
    let orderBy = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "rating") orderBy = { rating: "desc" };
    else if (sort === "name") orderBy = { name: "asc" };

    // Pagination
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    // Get products
    const products = await prisma.product.findMany({
      where: {
        categoryId: { in: categoryIds },
      },
      orderBy,
      take,
      skip,
      include: {
        category: true,
      },
    });

    const total = await prisma.product.count({
      where: { categoryId: { in: categoryIds } },
    });

    res.json({
      category,
      products,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error("Get category products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

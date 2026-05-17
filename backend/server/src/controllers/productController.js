import prisma from "../lib/prisma.js";

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return Boolean(value);
};

const parseImagesArray = (images) => {
  if (!images) return [];

  if (Array.isArray(images)) {
    return images;
  }

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean);
    }
  }

  return [];
};

// @route   GET /api/products
// @desc    Get all products (with filters)
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      search,
      featured,
      onSale,
      isNew,
      minPrice,
      maxPrice,
      sort,
      limit = 20,
      page = 1,
    } = req.query;

    // Build filter object
    const where = {};

    // Filter by category slug
    if (category) {
      where.OR = [
        { category: { slug: category } },
        { category: { parent: { slug: category } } },
        { category: { parent: { parent: { slug: category } } } },
      ];
    }

    if (brand) {
      where.brand = { equals: brand, mode: "insensitive" };
    }

    // Search by name or brand
    if (search) {
      const searchOr = [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];

      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: searchOr }];
        delete where.OR;
      } else {
        where.OR = searchOr;
      }
    }

    // Filter by featured
    if (featured === "true") {
      where.featured = true;
    }

    // Filter by on sale
    if (onSale === "true") {
      where.onSale = true;
    }

    // Filter by new
    if (isNew === "true") {
      where.isNew = true;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Build sort object
    let orderBy = { createdAt: "desc" };

    if (sort === "price-asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price-desc") {
      orderBy = { price: "desc" };
    } else if (sort === "rating") {
      orderBy = { rating: "desc" };
    } else if (sort === "name") {
      orderBy = { name: "asc" };
    }

    // Pagination
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    // Get products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/products/:id
// @desc    Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/products/featured
// @desc    Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 4 } = req.query;

    const products = await prisma.product.findMany({
      where: { featured: true },
      take: parseInt(limit),
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Get featured products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      oldPrice,
      image,
      images,
      stock = 0,
      featured = false,
      isNew = false,
      onSale = false,
      brand,
      categoryId,
    } = req.body;

    if (!name || !price || !image || !categoryId) {
      return res.status(400).json({
        message: "Name, price, image, and categoryId are required",
      });
    }

    const parsedPrice = Number(price);
    const parsedOldPrice = oldPrice ? Number(oldPrice) : null;
    const parsedStock = Number(stock);
    const parsedCategoryId = Number(categoryId);

    if (Number.isNaN(parsedPrice)) {
      return res.status(400).json({
        message: "Price must be a valid number",
      });
    }

    if (Number.isNaN(parsedStock)) {
      return res.status(400).json({
        message: "Stock must be a valid number",
      });
    }

    if (Number.isNaN(parsedCategoryId)) {
      return res.status(400).json({
        message: "Category ID must be a valid number",
      });
    }

    if (parsedOldPrice !== null && Number.isNaN(parsedOldPrice)) {
      return res.status(400).json({
        message: "Old price must be a valid number",
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: parsedCategoryId,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parsedPrice,
        oldPrice: parsedOldPrice,
        image,
        images: parseImagesArray(images),
        stock: parsedStock,
        featured: parseBoolean(featured),
        isNew: parseBoolean(isNew),
        onSale: parseBoolean(onSale),
        brand: brand || null,
        categoryId: parsedCategoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error Create Products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   PUT /api/products/:id
// @desc    Update product Admin only
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      image,
      images,
      stock,
      featured,
      isNew,
      onSale,
      brand,
      categoryId,
    } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;

    if (description !== undefined) {
      updateData.description = description || null;
    }

    if (price !== undefined) {
      const parsedPrice = Number(price);

      if (Number.isNaN(parsedPrice)) {
        return res.status(400).json({
          message: "Price must be a valid number",
        });
      }

      updateData.price = parsedPrice;
    }

    if (oldPrice !== undefined) {
      if (oldPrice === "" || oldPrice === null) {
        updateData.oldPrice = null;
      } else {
        const parsedOldPrice = Number(oldPrice);

        if (Number.isNaN(parsedOldPrice)) {
          return res.status(400).json({
            message: "Old price must be a valid number",
          });
        }

        updateData.oldPrice = parsedOldPrice;
      }
    }

    if (image !== undefined) updateData.image = image;

    if (images !== undefined) {
      updateData.images = parseImagesArray(images);
    }

    if (stock !== undefined) {
      const parsedStock = Number(stock);

      if (Number.isNaN(parsedStock)) {
        return res.status(400).json({
          message: "Stock must be a valid number",
        });
      }

      updateData.stock = parsedStock;
    }

    if (featured !== undefined) {
      updateData.featured = parseBoolean(featured);
    }

    if (isNew !== undefined) {
      updateData.isNew = parseBoolean(isNew);
    }

    if (onSale !== undefined) {
      updateData.onSale = parseBoolean(onSale);
    }

    if (brand !== undefined) {
      updateData.brand = brand || null;
    }

    if (categoryId !== undefined) {
      const parsedCategoryId = Number(categoryId);

      if (Number.isNaN(parsedCategoryId)) {
        return res.status(400).json({
          message: "Category ID must be a valid number",
        });
      }

      const category = await prisma.category.findUnique({
        where: {
          id: parsedCategoryId,
        },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      updateData.categoryId = parsedCategoryId;
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   DELETE /api/products/:id
// @desc    Delete product Admin only
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    if (error.code === "P2003") {
      return res.status(400).json({
        message:
          "Cannot delete this product because it is connected to orders, reviews, daily deals, or other records.",
      });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

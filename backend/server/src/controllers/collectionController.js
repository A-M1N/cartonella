import prisma from "../lib/prisma.js";

// @route   GET /api/collections
// @desc    Get all collections (for hero cards)
export const getCollections = async (req, res) => {
  try {
    const collections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
    });

    res.json(collections);
  } catch (error) {
    console.error("Get collections error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/collections/:slug
// @desc    Get collection by slug
export const getCollectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const collection = await prisma.collection.findUnique({
      where: { slug },
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(collection);
  } catch (error) {
    console.error("Get collection error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

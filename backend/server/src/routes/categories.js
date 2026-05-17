import express from "express";
import {
  getCategories,
  getMainCategories,
  getCategoryBySlug,
  getCategoryProducts,
} from "../controllers/categoryController.js";

const router = express.Router();

// GET /api/categories - Get all categories
router.get("/", getCategories);

// GET /api/categories/main - Get main categories with hierarchy (for navigation)
router.get("/main", getMainCategories);

// GET /api/categories/:slug - Get single category
router.get("/:slug", getCategoryBySlug);

// GET /api/categories/:slug/products - Get all products in category
router.get("/:slug/products", getCategoryProducts);

export default router;

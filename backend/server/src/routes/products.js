import express from "express";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminOnly } from "../middleware/admin.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/products - Get all products (with filters)
router.get("/", getProducts);

// GET /api/products/featured - Get featured products
router.get("/featured", getFeaturedProducts);

//ADMIN ROUTES
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

// GET /api/products/:id - Get single product
router.get("/:id", getProductById);

export default router;

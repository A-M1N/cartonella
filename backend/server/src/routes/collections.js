import express from "express";
import {
  getCollections,
  getCollectionBySlug,
} from "../controllers/collectionController.js";

const router = express.Router();

// GET /api/collections - Get all collections
router.get("/", getCollections);

// GET /api/collections/:slug - Get single collection
router.get("/:slug", getCollectionBySlug);

export default router;

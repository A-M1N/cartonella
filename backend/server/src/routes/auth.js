import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  googleAuth,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

router.post("/google", googleAuth);

//GET /api/auth/me (protected - needs token)
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

router.get("/admin/me", protect, adminOnly, getMe);

export default router;

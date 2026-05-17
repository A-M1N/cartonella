import express from "express";
import multer from "multer";
import { uploadAvatar } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Memory storage – file available as req.file.buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Image files are allowed (jpeg,jpg,png,webp)"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
});

router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);

export default router;

import prisma from "../lib/prisma.js";
import { supabase } from "../lib/supabase.js";

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }
    // Get User ID from auth middleware
    const userId = req.user.id;
    const file = req.file;

    // Generate a unique filename
    const timestamp = Date.now();
    const extension = file.originalname.split(".").pop();
    const fileName = `${userId}-${timestamp}.${extension}`;

    // Upload to Supabase Storage bucket "profiles"
    const { data, error } = await supabase.storage
      .from("profiles")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return res.status(500).json({ message: "Upload to storage failed" });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("profiles")
      .getPublicUrl(fileName);

    const avatarURL = urlData.publicUrl;

    // Update the user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarURL },
    });

    res.json({
      message: "Avatar Uploaded Successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

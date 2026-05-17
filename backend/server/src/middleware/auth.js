import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not Authorized, no  token",
      });
    }
    // Extract Token (remove "Bearer prefix")
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Not Authorized,user not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error", error);
    res.status(401).json({
      message: "Not Authorized, token invalid",
    });
  }
};

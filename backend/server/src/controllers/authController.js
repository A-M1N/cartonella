import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// route POST /api/auth/register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Provide Name, Email and Password",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser.id);

    // Send response
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please Provide Email and Password",
      });
    }
    //find user in db
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    // Generate Token
    const token = generateToken(user.id);

    // Send Response
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// route GET /api/auth/me get current user

export const getMe = async (req, res) => {
  try {
    // req.user is protected by Middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { addresses: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        addresses: user.addresses,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        addresses: true,
      },
    });
    res.json({ user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const googleAuth = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: "Access token missing" });
  }

  try {
    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!googleRes.ok) {
      return res.status(401).json({ message: "Invalid Google access token" });
    }

    const { email, name, picture, sub: googleId } = await googleRes.json();

    if (!email) {
      return res.status(400).json({ message: "Google account has no email" });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);

      user = await prisma.user.create({
        data: {
          name: name || email.split("@")[0],
          email,
          password: randomPassword,
          avatar: picture,
          googleId,
          role: "USER",
        },
      });
    } else if (!user.googleId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google Authentication Failed" });
  }
};

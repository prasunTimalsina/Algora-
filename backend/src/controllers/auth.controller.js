import { db } from "../libs/db.js";
import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma/index.js";
import { ApiResponse } from "../utils/api.response.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(401, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  const acessToken = jwt.sign(
    {
      id: newUser.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("accessToken", acessToken, {
    maxAge: 1000 * 60 * 60 * 24, //1 day
    httpOnly: true,
    secure: true,
  });

  res
    .status(200)
    .json(new ApiResponse(201, newUser, "User Created sucessfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  const acessToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("accessToken", acessToken, {
    maxAge: 1000 * 60 * 60 * 24, //1 day
    httpOnly: true,
    secure: true,
  });

  res.status(200).json(new ApiResponse(201, user, "User Created sucessfully"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

export const check = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    user: req.user,
  });
};

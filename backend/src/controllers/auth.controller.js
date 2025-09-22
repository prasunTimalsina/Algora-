import { db } from "../libs/db.js";
import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import bcrypt, { hash } from "bcryptjs";
import crypto from "crypto";
import { UserRole } from "../generated/prisma/index.js";
import { ApiResponse } from "../utils/api.response.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
} from "../utils/auth.util.js";
import {
  emailVerificationMailgenContent,
  sendEmail,
} from "../utils/mail.util.js";
import { use, useReducer } from "react";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exist
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      role: UserRole.USER,
    },
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // getting token for email verification
  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  //updating the user tokens
  await db.user.update({
    where: { id: newUser.id },
    data: {
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: new Date(tokenExpiry).toISOString(),
    },
  });

  //generating mail content
  const verificationUrl = `http://localhost:8080/api/v1/users/verify-email/${unHashedToken}`;
  const emailVerificationMailContent = emailVerificationMailgenContent(
    newUser.email,
    verificationUrl
  );

  await sendEmail({
    email: newUser?.email,
    subject: "Verify your email",
    mailgenContent: emailVerificationMailContent,
  });

  const createdUser = await db.user.findUnique({
    where: {
      id: newUser.id,
    },
    select: {
      id: true,
      email: true,
      isEmailVerified: true,
    },
  });

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
    .json(
      new ApiResponse(201, { user: createdUser }, "User Created sucessfully")
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError("Username or Password is required");
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = await generateAccessToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);

  await db.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
    },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await db.user.findUnique({
    where: { id: user.id },
    omit: {
      password: true,
      refreshToken: true,
      emailVerificationToken: true,
      emailVerificationExpiry: true,
    },
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in sucessfully"
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  await db.user.update({
    where: { id: req.user.id },
    data: {
      refreshToken: "",
    },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"));
  //validation
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(400, "Email Verification token missing");
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const user = await db.user.findFirst({
    where: {
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { gt: new Date().toISOString() },
    },
  });

  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerificationToken: null,
      emailVerificationExpiry: null,
      isEmailVerified: true,
    },
  });

  return res
    .status(200)
    .json(
      200,
      new ApiResponse(200, { isEmailVerified: true }, "Email is verified")
    );
});

export const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await db.user.findUnique({
    where: { id: req?.body._id },
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  if (user.isEmailVerified) {
    throw new ApiError(409, "User is already verified");
  }

  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  //updating the user tokens
  await db.user.update({
    where: { id: newUser.id },
    data: {
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: new Date(tokenExpiry).toISOString(),
    },
  });

  //generating mail content
  const verificationUrl = `http://localhost:8000/api/v1/users/verify-email/${unHashedToken}`;
  const emailVerificationMailContent = emailVerificationMailgenContent(
    user.email,
    verificationUrl
  );

  await sendEmail({
    email: user?.email,
    subject: "Verify your email",
    mailgenContent: emailVerificationMailContent,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Mail has been sent to your mail ID"));
  //validation
});

//////////////// Forgot Password and Reset Password ////////////////
export const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();
  await db.user.update({
    where: { email },
    data: {
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: tokenExpiry,
    },
  });

  //send user email with password reset link
  await sendEmail({
    email: user.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      `http://localhost:8000/api/v1/users/reset-password/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
});

export const resetForgotPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "Password is required");
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await db.user.findFirst({
    where: {
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { gt: new Date.now().toISOString() },
    },
  });

  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      forgotPasswordExpiry: null,
      forgotPasswordToken: null,
    },
  });

  res.status(200).json(new ApiResponse(200, {}, "Password reset sucessfully"));
});

/**
 * Refreshing Access Token
 */

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await db.user.findUnique({
      where: { id: decodedToken?.id },
    });

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = await generateAccessToken(user.id);
    const newRefreshToken = await generateRefreshToken(user.id);

    await db.user.update({
      where: { id: user.id },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    return res
      .status(200)
      .cookie("acessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await db.user.findUnique({ where: { id: req.user.id } });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed sucessfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await db.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfully"));
});

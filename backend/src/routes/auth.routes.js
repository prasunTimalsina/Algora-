import express from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  getGoogleLoginPage,
  getGoogleLoginUrl,
  debugGoogleConfig,
  getGoogleLoginCallback,
} from "../controllers/oauth.controller.js";
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/verify-email/:verificationToken").get(verifyEmail);
authRouter.route("/resend-email-verification").post(resendEmailVerification);

authRouter.route("/log-in").post(login);
authRouter.route("/log-out").post(verifyJwt, logout);

authRouter.route("/google").get(getGoogleLoginPage);
authRouter.route("/google/url").get(getGoogleLoginUrl); // Test endpoint for Postman
authRouter.route("/google/debug").get(debugGoogleConfig); // Debug OAuth config
authRouter.route("/google/callback").get(getGoogleLoginCallback);

authRouter.route("/forgot-password").put(forgotPasswordRequest);
authRouter.route("/reset-password/:resetToken").put(resetForgotPassword);
authRouter.route("/change-password").put(verifyJwt, changeCurrentPassword);

authRouter.route("/reset-refresh-token").put(verifyJwt, refreshAccessToken);

authRouter.route("/get-me").get(verifyJwt, getCurrentUser);
export default authRouter;

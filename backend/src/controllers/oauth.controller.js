import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { asyncHandler } from "../utils/async.handler.js";
import { google } from "../libs/oauth/google.js";
import {
  createUserWithOauth,
  getUserWithOauthId,
  linkUserWithOauth,
} from "../utils/auth.util.js";

export const getGoogleLoginPage = asyncHandler(async (req, res) => {
  if (req.user) return;

  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  const cookieConfig = {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 60 * 1000, // 10 minutes
    sameSite: "lax",
  };

  res.cookie("google_auth_state", state, cookieConfig);
  res.cookie("google_auth_code_verifier", codeVerifier, cookieConfig);

  res.redirect(url.toString());
});

// Test endpoint for Postman - returns URL instead of redirecting
export const getGoogleLoginUrl = asyncHandler(async (req, res) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  res.json({
    success: true,
    data: {
      authUrl: url.toString(),
      state,
      codeVerifier,
    },
    message: "Google OAuth URL generated successfully",
  });
});

// Debug endpoint to check OAuth configuration
export const debugGoogleConfig = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:
        process.env.GOOGLE_REDIRECT_URI ||
        "http://localhost:8080/api/v1/auth/google/callback",
      clientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    },
    message: "Google OAuth configuration debug info",
  });
});

export const getGoogleLoginCallback = asyncHandler(async (req, res) => {
  //google redirects with code , and state in query params
  // we will use to find out the user
  const { code, state } = req.query;

  const {
    google_auth_state: storedState,
    google_auth_code_verifier: codeVerifier,
  } = req.cookies;

  if (
    !code ||
    !state ||
    !storedState ||
    !codeVerifier ||
    state !== storedState
  ) {
    req.flash(
      "errors",
      "Couldn't login with Goolgle because of invalid login attempt. Please try again"
    );
    return res.redirect("/login");
  }

  let tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (error) {
    //TODO: Check about this flash and the redirect make sure to check them in all controller function not only this
    //FIXME: BUG: IMPORTANT!
    req.flash(
      "errors",
      "Couldn't login with Google because of invalid login attemt. Please try again!"
    );
    return res.redirect("/auth/login");
  }
  console.log("token google", tokens);

  const claims = decodeIdToken(tokens.idToken());
  const { sub: googleUserId, name, email } = claims;

  /**
   * Now there will be three condition
   */

  /**
   * Condition 1 :  User already exist with the same email ,  google's auth linked
   */

  /**
   * Condition 2 :  User already exist with the same email but google's auth isn't linked
   */

  /**
   * Condition 3:  User doesn't exist
   */

  /**
   * If user is already linked then we will get the user
   */

  let user = await getUserWithOauthId({
    provider: "google",
    email,
  });

  // if user exist but user is not linked with oauth
  if (user && !user.providerAccountId) {
    await linkUserWithOauth({
      userId: user.id,
      provider: "google",
      providerAccountId: googleUserId,
    });
  }

  // if user doesn't exist
  if (!user) {
    user = await createUserWithOauth({
      name,
      email,
      provider: "google",
      providerAccountId: googleUserId,
    });
  }

  /// TODO: Now based on this user login the user with access token and refresh token
  /// TODO: And also fix the password error
});

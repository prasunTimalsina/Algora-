import crypto from "crypto";
import { db } from "../libs/db";

export const generateTemporaryToken = () => {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes;

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const generateAccessToken = async (userId) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
export const generateRefreshToken = async (userId) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  return jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

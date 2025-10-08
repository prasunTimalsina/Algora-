import crypto from "crypto";
import { db } from "../libs/db.js";

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

/**
 * For OAuth
 */

export async function getUserWithOauthId({ provider, email }) {
  const user = db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      isEmailVerified: true,
      oauthAccounts: {
        where: { provider },
        select: {
          providerAccountId: true,
          provider: true,
        },
      },
    },
  });
  return user;
}

export async function linkUserWithOauth({
  userId,
  provider,
  providerAccountId,
}) {
  await db.oauthaccounts.create({
    userId,
    provider,
    providerAccountId,
  });
}

export async function createUserWithOauth(
  name,
  email,
  provider,
  providerAccountId
) {
  const result = await db.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        email,
        isEmailVerified: true,
        password: "12345", //FIXME: you need to fix this , the password is set for temporary transaction only
        fullName: name,
      },
    });

    await prisma.oAuthAccount.create({
      data: {
        provider,
        providerAccountId,
        userId: user.id,
      },
    });

    return {
      id: user.id,
      name,
      email,
      provider,
      providerAccountId,
    };
  });

  return result;
}

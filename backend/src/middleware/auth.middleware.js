import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api.error.js";
import { asyncHandler } from "../utils/async.handler.js";
import { db } from "../libs/db.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const acessToken = req.cookies?.accessToken;
  if (!acessToken) {
    throw new ApiError(400, "Unauthorized request");
  }

  const decoded = jwt.verify(acessToken, process.env.ACCESS_TOKEN_SECRET);

  const user = await db.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid Access Token or Expired Token");
  }
  console.log(user);
  req.user = user;

  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;

  if (role !== "ADMIN") {
    throw new ApiError(403, "Forbidden request: You are not an admin");
  }

  next();
});

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// Verify the token

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });

};

// Verify the token and the user

export const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    };
};

// Verify the token and if user is admin

export const verifyAdmin = (req, res, next) => {
  console.log("verifyAdmin");
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not an administrator !"));
    }
};
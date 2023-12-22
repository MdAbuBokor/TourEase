import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.acc_access_token;
  if (!token) {
    return next(errorHandler(401, "Please login to access this resource"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, accommodation) => {
    if (err) return next(errorHandler(403, "Forbidden resource"));
    req.accommodation = accommodation;
    next();
  });
};

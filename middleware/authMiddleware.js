const jwt = require("jsonwebtoken");
const CustomError = require("../Error/customError");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError("Please login to access this route", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    if (user.isBanned) {
      return next(new CustomError("You are banned from this platform", 403));
    }
    req.user = user;
    next();
  } catch (error) {
    throw new CustomError("Invalid token", 401);
  }
};

module.exports = protect;

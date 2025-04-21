const CustomError = require("../Error/customError");
const { StatusCodes } = require("http-status-codes");

const adminOnly = async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new CustomError("Admin access only", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = adminOnly;

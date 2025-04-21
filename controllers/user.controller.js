// get a user's profile

const CustomError = require("../Error/customError");
const User = require("../models/User");

const getAuthorProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name bio avatar"
    );

    if (!user) throw new CustomError("Author not found");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getAuthorProfile;

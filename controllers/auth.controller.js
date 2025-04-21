const User = require("../models/User");
const CustomError = require("../Error/customError");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");

// utils
const createCookie = require("../utils/createCookie");
const sendMail = require("../utils/nodemailerConfig");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new CustomError(
        "Email already registered",
        StatusCodes.BAD_REQUEST
      );

    const token = crypto.randomBytes(40).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      verificationToken: token,
    });

    // verification url
    const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${token}&email=${email}`;
    // message
    const message = `<p>Click to verify: <a href="${verificationURL}">Verify Email</a></p>`;
    // sendmail function
    await sendMail(email, "Verify Your Email", message);

    createCookie(res, user._id);

    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError(
        "Email and password required",
        StatusCodes.BAD_REQUEST
      );

    const user = await User.findOne({ email });
    if (!user)
      throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);

    createCookie(res, user._id);

    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  await res.clearCookie("token");
  res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw new CustomError("User not found", StatusCodes.NOT_FOUND);
    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.query;

    const user = await User.findOne({ email });
    if (!user || user.verificationToken !== token) {
      throw new CustomError(
        "user not found or token invalid",
        StatusCodes.NOT_FOUND
      );
    }

    user.isVerified = true;
    user.verifiedAt = new Date();
    user.verificationToken = undefined;
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Email verified successfully" });
  } catch (error) {
    next(new CustomError("Error validating user verification token"));
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body.email;
    const user = await User.findOne({ email });

    if (!user)
      throw new CustomError(
        "User doesnot exist, please create an account",
        StatusCodes.NOT_FOUND
      );

    const token = crypto.randomBytes(40).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${token}&email=${email}`;
    const message = `Click : ${resetURL} to change your password, this link expires in 10 minutes`;
    // send mail
    await sendMail(email, "Reset Password", message);
    // send response after email has been sent
    res.status(StatusCodes.OK).json({ message: "Reset email sent" });
  } catch (error) {
    next(
      new CustomError(
        "Error sendind the reset password token",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { email, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      throw new CustomError(
        "invalid or expired token",
        StatusCodes.EXPECTATION_FAILED
      );

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(StatusCodes.OK).json({ message: "Password reset successful" });
  } catch (error) {
    next(new CustomError("Error reseting password"));
  }
};

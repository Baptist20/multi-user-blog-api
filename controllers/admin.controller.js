// admin only

const Post = require("../models/Post");
const User = require("../models/User");

// get all users and posts
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "name avatar");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// delete a user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

// delete a post
const deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

// make a user an admin
// PUT /api/users/:id/make-admin
const makeAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new CustomError("Only admins can promote users", 403));
  }

  const user = await User.findById(req.params.id);
  if (!user) return next(new CustomError("User not found", 404));

  user.role = "admin";
  await user.save();

  res.status(200).json({ message: "User promoted to admin" });
};

// ban a user
const toggleBanUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(new CustomError("User not found", 404));

    user.isBanned = !user.isBanned;
    await user.save();

    res
      .status(200)
      .json({ message: `User ${user.isBanned ? "banned" : "unbanned"}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllPosts,
  deleteUser,
  deletePost,
  makeAdmin,
  toggleBanUser,
};

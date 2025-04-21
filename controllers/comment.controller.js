const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) return next(new CustomError("Post not found", 404));

    const comment = await Comment.create({
      content,
      user: req.user.id,
      post: req.params.postId,
    });

    await comment.populate("user", "name avatar");

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "name avatar"
    );

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return next(new CustomError("Comment not found", 404));

    if (req.user.role !== "admin" && req.user.id !== comment.user.toString()) {
      return next(new CustomError("Not authorized", 403));
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return next(new CustomError("Comment not found", 404));

    if (req.user.role !== "admin" && req.user.id !== comment.user.toString()) {
      return next(new CustomError("Not authorized", 403));
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, getComments, updateComment, deleteComment };

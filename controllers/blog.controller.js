const Post = require("../models/Post");
const CustomError = require("../Error/customError");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const createPost = async (req, res, next) => {
  try {
    const { title, content, category, tags, status: postStatus } = req.body;
    if (!title && !content && !category) {
      throw new CustomError(
        "Title, content, and category are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const image = req.file ? req.file.path : null;

    const newPost = await Post.create({
      title,
      content,
      category,
      tags: tags ? tags.split(",") : [],
      image,
      author: req.user.id,
      status: postStatus || "published",
    });

    // change user role from reader to author
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new CustomError("user not found", StatusCodes.NOT_FOUND);

    user.role = "author";
    await user.save();
    res.status(StatusCodes.CREATED).json({ newPost });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const {
      category,
      status,
      author,
      tags,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // sorting, filtering, paginating and limit
    const queryObj = {};

    // filtering
    if (category) queryObj.category = category;
    if (status) queryObj.status = status;
    if (author) queryObj.author = author;
    if (tags) queryObj.tags = { $in: tags.split(",") };
    if (search) queryObj.title = { $regex: search, $options: "i" };

    // return all post based on the filter option passed to the query object key value pairs and paginate
    let postsQuery = Post.find(queryObj)
      .populate("author", "name avatar")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // sorting by date
    if (sort === "latest") postsQuery = postsQuery.sort("-createdAt");
    if (sort === "oldest") postsQuery = postsQuery.sort("createdAt");
    if (sort === "updated") postsQuery = postsQuery.sort("-updatedAt");

    // return all posts after filtering and sorting
    const posts = await postsQuery;

    // count number of posts based on filter options passed to the Post
    const total = await Post.countDocuments(queryObj);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name avatar bio"
    );
    if (!post)
      throw new CustomError("Post not found", StatusCodes.UNAUTHORIZED);

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    return next(new CustomError("Post not found", StatusCodes.UNAUTHORIZED));
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post)
      throw new CustomError("Post deos not exist", StatusCodes.NOT_FOUND);

    if (req.user.role !== "admin" && req.user.id !== post.author.toString())
      throw new CustomError(
        "You are not authorized to update this post",
        StatusCodes.UNAUTHORIZED
      );

    const fieldsToUpdate = ["title", "content", "tags", "category", "status"];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field]) {
        post[field] = req.body[field];
      }
    });

    // optional: update image
    if (req.file && req.file.path) {
      post.image = req.file.path;
    }

    post.status = req.body.status || post.status;

    await post.save();

    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) throw new CustomError("Post not found", StatusCodes.NOT_FOUND);

    if (req.user.role !== "admin" && req.user.id !== post.author.toString())
      throw new CustomError(
        "Not authorized to delete this post",
        StatusCodes.UNAUTHORIZED
      );

    await post.deleteOne();

    res.status(StatusCodes.OK).json({ message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const { status, sort, page = 1, limit = 10 } = req.query;

    const queryObj = { author: req.user.id };
    if (status) queryObj.status = status;

    let postsQuery = Post.find(queryObj)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (sort === "oldest") postsQuery = postsQuery.sort("createdAt");
    if (sort === "updated") postsQuery = postsQuery.sort("-updatedAt");

    const posts = await postsQuery;
    const total = await Post.countDocuments(queryObj);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDrafts = async (req, res, next) => {
  try {
    const drafts = await Post.find({
      author: req.user.id,
      status: "draft",
    }).sort({ createdAt: -1 });

    res.status(200).json(drafts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getMyPosts,
  getUserDrafts,
};

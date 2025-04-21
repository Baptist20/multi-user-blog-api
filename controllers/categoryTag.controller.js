const Category = require("../models/Category");
const Tag = require("../models/Tag");
const CustomError = require("../Error/customError");

//// CATEGORY CONTROLLERS ////

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) return next(new CustomError("Category already exists", 400));

    const category = await Category.create({ name: name.trim() });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(new CustomError("Category not found", 404));
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

//// TAG CONTROLLERS ////

const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    const exists = await Tag.findOne({ name: name.trim() });
    if (exists) return next(new CustomError("Tag already exists", 400));

    const tag = await Tag.create({ name: name.trim() });
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return next(new CustomError("Tag not found", 404));
    res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    next(error);
  }
};

const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  createTag,
  deleteTag,
  getAllTags,
};

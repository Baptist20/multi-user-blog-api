const express = require("express");
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  createTag,
  deleteTag,
  getAllTags,
} = require("../controllers/categoryTag.controller");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

/// CATEGORY ROUTES
router.post("/categories", protect, adminOnly, createCategory);
router.get("/categories", protect, getAllCategories);
router.delete("/categories/:id", protect, adminOnly, deleteCategory);

/// TAG ROUTES
router.post("/tags", protect, adminOnly, createTag);
router.get("/tags", protect, getAllTags);
router.delete("/tags/:id", protect, adminOnly, deleteTag);

module.exports = router;

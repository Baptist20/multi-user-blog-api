const express = require("express");

const {
  getAllPosts,
  getAllUsers,
  deleteUser,
  deletePost,
  toggleBanUser,
  makeAdmin,
} = require("../controllers/admin.controller");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const { createCategory } = require("../controllers/categoryTag.controller");

const router = express.Router();
// users admin routes
router.get("/get-users", protect, adminOnly, getAllUsers);
router.delete("/delete-user/:userId", protect, adminOnly, deleteUser);
router.post("/make-admin/:userId", protect, adminOnly, makeAdmin);
router.delete("/ban-user/:userId/ban", protect, adminOnly, toggleBanUser);
// post admin routes
router.get("/get-posts", protect, adminOnly, getAllPosts);
router.delete("/delete-post/:postId", protect, adminOnly, deletePost);
// category admin routes
router.post("/create-category", protect, adminOnly, createCategory);

module.exports = router;

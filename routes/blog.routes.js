const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../utils/multerConfig");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/blog.controller");
const router = express.Router();

router.get("/get-all-post", getAllPosts);
router.post("/create-post", protect, upload.single("image"), createPost);
router.get("/get-single-post/:id", getSinglePost);
router.patch("/update-post/:id", protect, upload.single("image"), updatePost);
router.delete("/delete-post/:id", protect, deletePost);
router.get("/get-my-posts/:userId", protect, getMyPosts);

module.exports = router;

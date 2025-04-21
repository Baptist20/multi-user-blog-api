const express = require("express");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-comment/:postId", protect, createComment);
router.get("/get-comments/:postId", getComments);
router.patch("/update-comment/:commentId", protect, updateComment);
router.delete("/delete-comment/:commentId", protect, deleteComment);

module.exports = router;

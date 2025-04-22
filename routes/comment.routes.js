// const express = require("express");
// const {
//   createComment,
//   getComments,
//   updateComment,
//   deleteComment,
// } = require("../controllers/comment.controller");
// const protect = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/create-comment/:postId", protect, createComment);
// router.get("/get-comments/:postId", getComments);
// router.patch("/update-comment/:commentId", protect, updateComment);
// router.delete("/delete-comment/:commentId", protect, deleteComment);

// module.exports = router;

const express = require("express");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manage comments on blog posts
 */

/**
 * @swagger
 * /blogs-api/v1/create-comment/{postId}:
 *   post:
 *     summary: Create a new comment on a post
 *     tags: [Comments]
 *     description: Allows authenticated users to create a comment on a specific post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               required: true
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized, must be logged in
 */
router.post("/create-comment/:postId", protect, createComment);

/**
 * @swagger
 * /blogs-api/v1/get-comments/{postId}:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     description: Retrieve all comments associated with a given post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to fetch comments for
 *     responses:
 *       200:
 *         description: List of comments for the post
 *       404:
 *         description: Post not found
 */
router.get("/get-comments/:postId", getComments);

/**
 * @swagger
 * /blogs-api/v1/update-comment/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     description: Allows authenticated users to update their own comment.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       404:
 *         description: Comment not found
 */
router.patch("/update-comment/:commentId", protect, updateComment);

/**
 * @swagger
 * /blogs-api/v1/delete-comment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     description: Allows authenticated users to delete their own comment.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       404:
 *         description: Comment not found
 */
router.delete("/delete-comment/:commentId", protect, deleteComment);

module.exports = router;

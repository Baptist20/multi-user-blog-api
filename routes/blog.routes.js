// const express = require("express");
// const protect = require("../middleware/authMiddleware");
// const upload = require("../utils/multerConfig");
// const {
//   createPost,
//   getAllPosts,
//   getSinglePost,
//   updatePost,
//   deletePost,
//   getMyPosts,
// } = require("../controllers/blog.controller");
// const router = express.Router();

// router.get("/get-all-post", getAllPosts);
// router.post("/create-post", protect, upload.single("image"), createPost);
// router.get("/get-single-post/:id", getSinglePost);
// router.patch("/update-post/:id", protect, upload.single("image"), updatePost);
// router.delete("/delete-post/:id", protect, deletePost);
// router.get("/get-my-posts/:userId", protect, getMyPosts);

// module.exports = router;

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

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog Post Management
 */

/**
 * @swagger
 * /blogs-api/v1/get-all-post:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of all blog posts
 */
router.get("/get-all-post", getAllPosts);

/**
 * @swagger
 * /blogs-api/v1/create-post:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     description: Authenticated users can create new blog posts. Includes an image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       401:
 *         description: Unauthorized, must be logged in
 */
router.post("/create-post", protect, upload.single("image"), createPost);

/**
 * @swagger
 * /blogs-api/v1/get-single-post/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get("/get-single-post/:id", getSinglePost);

/**
 * @swagger
 * /blogs-api/v1/update-post/{id}:
 *   patch:
 *     summary: Update an existing blog post
 *     tags: [Blog]
 *     description: Authenticated users can update their own blog posts. Includes an image upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       404:
 *         description: Post not found
 */
router.patch("/update-post/:id", protect, upload.single("image"), updatePost);

/**
 * @swagger
 * /blogs-api/v1/delete-post/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog]
 *     description: Authenticated users can delete their own blog posts.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       404:
 *         description: Post not found
 */
router.delete("/delete-post/:id", protect, deletePost);

/**
 * @swagger
 * /blogs-api/v1/get-my-posts/{userId}:
 *   get:
 *     summary: Get all blog posts created by a specific user
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose posts to retrieve
 *     responses:
 *       200:
 *         description: List of posts created by the user
 *       404:
 *         description: No posts found for the user
 */
router.get("/get-my-posts/:userId", protect, getMyPosts);

module.exports = router;

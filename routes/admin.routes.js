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
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  createTag,
  getAllTags,
  deleteTag,
} = require("../controllers/categoryTag.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin panel operations
 */

/**
 * @swagger
 * /blogs-api/v1/get-users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     description: Requires admin privileges. Auth via HttpOnly cookie containing JWT.
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get("/get-users", protect, adminOnly, getAllUsers);

/**
 * @swagger
 * /blogs-api/v1/delete-user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     description: Admin can delete a user by ID. Auth via HttpOnly cookie.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete-user/:userId", protect, adminOnly, deleteUser);

/**
 * @swagger
 * /blogs-api/v1/make-admin/{userId}:
 *   post:
 *     summary: Promote user to admin
 *     tags: [Admin]
 *     description: Make a user an admin. Requires admin privileges.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to promote
 *     responses:
 *       200:
 *         description: User promoted to admin
 *       404:
 *         description: User not found
 */
router.post("/make-admin/:userId", protect, adminOnly, makeAdmin);

/**
 * @swagger
 * /blogs-api/v1/ban-user/{userId}/ban:
 *   delete:
 *     summary: Ban or unban a user
 *     tags: [Admin]
 *     description: Toggle a user's ban status. Admin only.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to ban/unban
 *     responses:
 *       200:
 *         description: User ban status updated
 *       404:
 *         description: User not found
 */
router.delete("/ban-user/:userId/ban", protect, adminOnly, toggleBanUser);

/**
 * @swagger
 * /blogs-api/v1/get-posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Admin]
 *     description: View all posts (admin only)
 *     responses:
 *       200:
 *         description: List of blog posts
 *       401:
 *         description: Unauthorized
 */
router.get("/get-posts", protect, adminOnly, getAllPosts);

/**
 * @swagger
 * /blogs-api/v1/delete-post/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Admin]
 *     description: Admin can delete any blog post.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete("/delete-post/:postId", protect, adminOnly, deletePost);

/**
 * @swagger
 * /blogs-api/v1/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Admin]
 *     description: Admin can add new blog categories.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.post("/create-category", protect, adminOnly, createCategory);
/**
 * @swagger
 * /blogs-api/v1/get-categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Admin]
 *     description: Admin can view all categories.
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get("/get-categories", protect, adminOnly, getAllCategories);

/**
 * @swagger
 * /blogs-api/v1/delete-category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Admin]
 *     description: Admin can delete a category by ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete(
  "/delete-category/:categoryId",
  protect,
  adminOnly,
  deleteCategory
);

/**
 * @swagger
 * /blogs-api/v1/get-tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Admin]
 *     description: Admin can view all tags.
 *     responses:
 *       200:
 *         description: List of tags
 *       401:
 *         description: Unauthorized
 */
router.get("/get-tags", protect, adminOnly, getAllTags);

/**
 * @swagger
 * /blogs-api/v1/create-tag:
 *   post:
 *     summary: Create a new tag
 *     tags: [Admin]
 *     description: Admin can add new blog tags.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: JavaScript
 *     responses:
 *       201:
 *         description: Tag created
 *       400:
 *         description: Validation error
 */
router.post("/create-tag", protect, adminOnly, createTag);

/**
 * @swagger
 * /blogs-api/v1/delete-tag/{tagId}:
 *   delete:
 *     summary: Delete a tag
 *     tags: [Admin]
 *     description: Admin can delete a tag by ID.
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to delete
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       404:
 *         description: Tag not found
 */
router.delete("/delete-tag/:tagId", protect, adminOnly, deleteTag);

module.exports = router;

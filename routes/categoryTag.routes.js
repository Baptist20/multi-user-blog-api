// const express = require("express");
// const {
//   createCategory,
//   deleteCategory,
//   getAllCategories,
//   createTag,
//   deleteTag,
//   getAllTags,
// } = require("../controllers/categoryTag.controller");
// const protect = require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/adminOnly");

// const router = express.Router();

// /// CATEGORY ROUTES
// router.post("/categories", protect, adminOnly, createCategory);
// router.get("/categories", protect, getAllCategories);
// router.delete("/categories/:id", protect, adminOnly, deleteCategory);

// /// TAG ROUTES
// router.post("/tags", protect, adminOnly, createTag);
// router.get("/tags", protect, getAllTags);
// router.delete("/tags/:id", protect, adminOnly, deleteTag);

// module.exports = router;

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

/**
 * @swagger
 * tags:
 *   name: Category and Tag Management
 *   description: Manage blog categories and tags (admin only)
 */

/**
 * @swagger
 * /blogs-api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category and Tag Management]
 *     description: Admin-only route to create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       403:
 *         description: Forbidden, only admins can access this route
 */
router.post("/categories", protect, adminOnly, createCategory);

/**
 * @swagger
 * /blogs-api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category and Tag Management]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get("/categories", protect, getAllCategories);

/**
 * @swagger
 * /blogs-api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category and Tag Management]
 *     description: Admin-only route to delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       403:
 *         description: Forbidden, only admins can access this route
 *       404:
 *         description: Category not found
 */
router.delete("/categories/:id", protect, adminOnly, deleteCategory);

/**
 * @swagger
 * /blogs-api/v1/tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Category and Tag Management]
 *     description: Admin-only route to create a new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - description
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       403:
 *         description: Forbidden, only admins can access this route
 */
router.post("/tags", protect, adminOnly, createTag);

/**
 * @swagger
 * /blogs-api/v1/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Category and Tag Management]
 *     responses:
 *       200:
 *         description: List of all tags
 */
router.get("/tags", protect, getAllTags);

/**
 * @swagger
 * /blogs-api/v1/tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     tags: [Category and Tag Management]
 *     description: Admin-only route to delete a tag by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to delete
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       401:
 *         description: Unauthorized, must be logged in
 *       403:
 *         description: Forbidden, only admins can access this route
 *       404:
 *         description: Tag not found
 */
router.delete("/tags/:id", protect, adminOnly, deleteTag);

module.exports = router;

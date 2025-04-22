const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const getAuthorProfile = require("../controllers/user.controller");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & User Management
 */

/**
 * @swagger
 * /blogs-api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /blogs-api/v1/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     description: Authenticates user and returns JWT in HttpOnly cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /blogs-api/v1/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Clears the JWT cookie
 *     responses:
 *       200:
 *         description: User logged out
 */
router.post("/logout", logout);

/**
 * @swagger
 * /blogs-api/v1/verify-email:
 *   post:
 *     summary: Verify user email
 *     tags: [Auth]
 *     description: Verifies user email after registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid or expired token
 */
router.post("/verify-email", verifyEmail);

/**
 * @swagger
 * /blogs-api/v1/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: Email not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /blogs-api/v1/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /blogs-api/v1/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     description: Returns user info using JWT in HttpOnly cookie
 *     responses:
 *       200:
 *         description: User info
 *       401:
 *         description: Unauthorized
 */
router.get("/me", protect, getMe);

/**
 * @swagger
 * /blogs-api/v1/profile/{userId}:
 *   get:
 *     summary: Get author profile
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user (author)
 *     responses:
 *       200:
 *         description: Author profile
 *       404:
 *         description: User not found
 */
router.get("/profile/:userId", getAuthorProfile);

module.exports = router;

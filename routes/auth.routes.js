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

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// get user route
router.get("/me", protect, getMe);
router.get("/profile/:userId", getAuthorProfile);

module.exports = router;

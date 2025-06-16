const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth/authMiddleware");
const { validateUserUpdate, validateUserPasswordUpdate } = require("../middlewares/auth/validate");

router.put("/update", verifyToken, validateUserUpdate, userController.updateUser);
router.put("/password", verifyToken, validateUserPasswordUpdate, userController.updateUserPassword);

router.get("/profile", verifyToken, userController.getUserProfile);

module.exports = router;

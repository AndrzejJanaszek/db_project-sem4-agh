// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.get("/:id/sub/:subId", categoryController.getSubCategoryById);
router.get("/:id/sub/:subId/subsub/:subsubId", categoryController.getSubSubCategoryById);

module.exports = router;

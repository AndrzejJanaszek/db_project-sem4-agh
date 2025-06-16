const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { verifyToken } = require("../middlewares/auth/authMiddleware");
const { validateCompanyUpdate, validateCompanyPasswordUpdate } = require("../middlewares/auth/validate");

router.put("/update", verifyToken, validateCompanyUpdate, companyController.updateCompany);
router.put("/password", verifyToken, validateCompanyPasswordUpdate, companyController.updateCompanyPassword);

router.get("/profile", verifyToken, companyController.getCompanyProfile);

module.exports = router;

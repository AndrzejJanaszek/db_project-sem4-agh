const express = require("express");
const router = express.Router();

const { registerUser, registerCompany, loginUser, loginCompany } = require("../controllers/authController");
const {validateUser, validateCompany, validateLogin} = require("../middlewares/auth/validate")

router.post("/register/user", validateUser, registerUser);
router.post("/register/company", validateCompany, registerCompany);

router.post("/login/user", validateLogin, loginUser);
router.post("/login/company", validateLogin, loginCompany);

module.exports = router;

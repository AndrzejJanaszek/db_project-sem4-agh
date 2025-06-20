const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/:userId", transactionController.getTransactionsByUser);

module.exports = router;

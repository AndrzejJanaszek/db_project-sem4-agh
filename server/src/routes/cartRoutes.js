const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.addToCart);

router.delete("/", cartController.removeFromCart);

router.patch("/", cartController.updateCount);

router.get("/:userId", cartController.getCart);

module.exports = router;

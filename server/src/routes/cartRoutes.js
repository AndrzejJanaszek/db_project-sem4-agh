const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);

router.delete("/remove", cartController.removeFromCart);

router.patch("/update", cartController.updateCount);

router.get("/:userId", cartController.getCart);

module.exports = router;

const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.addReview);
router.delete("/:reviewId", reviewController.deleteReview);
router.patch("/:reviewId", reviewController.updateReview);
router.get("/product/:productId", reviewController.getReviewsByProduct);

module.exports = router;

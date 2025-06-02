const reviewServices = require("../services/reviewServices");

exports.addReview = async (req, res) => {
  const { productId, userId, content, rating } = req.body;
  try {
    const reviewId = await reviewServices.addReview(productId, userId, content, rating);
    res.status(201).json({ message: "Opinia dodana.", reviewId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    await reviewServices.deleteReview(reviewId);
    res.status(200).json({ message: "Opinia usunięta." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { content, rating } = req.body;
  try {
    await reviewServices.updateReview(reviewId, content, rating);
    res.status(200).json({ message: "Opinia zaktualizowana." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await reviewServices.getReviewsByProductId(productId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

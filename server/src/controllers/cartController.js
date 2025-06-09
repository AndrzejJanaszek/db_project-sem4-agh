const cartService = require("../services/cartServices");

exports.addToCart = async (req, res) => {
  const { userId, productId, variantId, count } = req.body;
  try {
    await cartService.addToCart(userId, productId, variantId, count);
    res.status(200).json({ message: "Dodano do koszyka." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId, variantId } = req.body;
  try {
    await cartService.removeFromCart(userId, productId, variantId);
    res.status(200).json({ message: "Usunięto z koszyka." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCount = async (req, res) => {
  const { userId, productId, variantId, count } = req.body;
  try {
    await cartService.updateProductCount(userId, productId, variantId, count);
    res.status(200).json({ message: "Zaktualizowano ilość produktu." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
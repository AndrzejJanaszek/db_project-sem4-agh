const productServices = require("../services/productServices");

exports.addProduct = async (req, res) => {
  try {    
    const product = await productServices.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProductName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await productServices.updateProductName(id, name);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productServices.deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const newVariant = req.body;
    const updated = await productServices.addVariant(id, newVariant);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { id, variantId } = req.params;
    const updatedVariantData = req.body;
    const result = await productServices.updateVariant(id, variantId, updatedVariantData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const { id, variantId } = req.params;
    const result = await productServices.deleteVariant(id, variantId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



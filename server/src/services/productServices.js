const Product = require("../models/Product");

exports.addProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

exports.updateProductName = async (productId, newName) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { name: newName },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

exports.deleteProduct = async (productId) => {
  const deleted = await Product.findByIdAndDelete(productId);
  return deleted; // null jeśli nie znaleziono
};

exports.addVariant = async (productId, newVariant) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $push: { variants: newVariant } },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Produkt nie znaleziony");
  }

  return updatedProduct;
};

exports.updateVariant = async (productId, variantId, variantData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Produkt nie znaleziony");
  }

  const variant = product.variants.id(variantId);
  if (!variant) {
    throw new Error("Wariant nie znaleziony");
  }

  // Zaktualizuj tylko przekazane pola
  Object.keys(variantData).forEach((key) => {
    variant[key] = variantData[key];
  });

  await product.save();
  return product;
};

exports.deleteVariant = async (productId, variantId) => {
  const updated = await Product.findByIdAndUpdate(
    productId,
    { $pull: { variants: { _id: variantId } } },
    { new: true }
  );
  return updated;
};
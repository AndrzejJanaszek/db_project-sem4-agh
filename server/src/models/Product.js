const mongoose = require("mongoose");

const parameterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  parameters: [parameterSchema],
  images: [{ type: String }],
  description: { type: String }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  variants: [variantSchema]
});

module.exports = mongoose.model("Product", productSchema);

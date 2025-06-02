// services/categoryService.js
const Category = require("../models/Category");

exports.getAllCategories = async () => {
  return await Category.find();
};

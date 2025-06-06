// services/categoryService.js
const Category = require("../models/Category");

exports.getAllCategories = async () => {
  return await Category.find();
};

exports.getCategoryById = async (categoryId) => {  
  return await Category.findById(categoryId);
};

exports.getSubCategoryById = async (categoryId, subCategoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) return null;

  // Porównujemy _id jako string, bo subCategoryId jest stringiem z parametru URL
  const subcategory = category.subcategories.id(subCategoryId);

  console.log("subcat", subcategory);
  
  return subcategory || null;
};

exports.getSubSubCategoryById = async (categoryId, subCategoryId, subSubCategoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) return null;

  const subcategory = category.subcategories.find(
    (sub) => sub._id.toString() === subCategoryId
  );
  if (!subcategory) return null;

  const subsubcategory = subcategory.subcategories.find(
    (subsub) => subsub._id.toString() === subSubCategoryId
  );

  return subsubcategory || null;
};
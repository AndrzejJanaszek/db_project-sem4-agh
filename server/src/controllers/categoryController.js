// controllers/categoryController.js
const categoryServices = require("../services/categoryServices");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryServices.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryServices.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch category." });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await categoryServices.getSubCategoryById(
      req.params.id,
      req.params.subId
    );
    console.log(req.params.id,
      req.params.subId);
    
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }
    res.json(subcategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subcategory." });
  }
};

exports.getSubSubCategoryById = async (req, res) => {
  try {
    const subsubcategory = await categoryServices.getSubSubCategoryById(
      req.params.id,
      req.params.subId,
      req.params.subsubId
    );
    if (!subsubcategory) {
      return res.status(404).json({ error: "Sub-subcategory not found" });
    }
    res.json(subsubcategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sub-subcategory." });
  }
};
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

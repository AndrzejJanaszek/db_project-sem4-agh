// init/initCategories.js
const Category = require("../models/Category");
const categoriesData = require("./categories.json");

exports.initCategories = async () => {
  const count = await Category.countDocuments();

  if (count === 0) {
    try {
      await Category.insertMany(categoriesData.categories);
      console.log("Kategorie zostały dodane do bazy danych.");
    } catch (err) {
      console.error("Błąd podczas dodawania kategorii:", err);
    }
  } else {
    console.log("Kategorie już istnieją w bazie — pomijam import.");
  }
};

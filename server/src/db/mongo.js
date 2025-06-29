const mongoose = require("mongoose");
require("dotenv").config();
const { initCategories } = require("./initCategories");

exports.connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 sekund
    });
    console.log("Połączono z MongoDB");

    await initCategories();
  } catch (err) {
    console.error("Błąd połączenia z MongoDB:", err);
    process.exit(1);
  }
};
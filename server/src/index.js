const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectMongo } = require("./db/mongo");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

const startServer = async () => {
  try {
    await connectMongo();

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api", authRoutes);

    app.use("/api/products", productRoutes);

    app.use("/api/categories", categoryRoutes);

    app.use("/api/cart", cartRoutes);

    app.use("/api/reviews", reviewRoutes);

    app.use("/api/transactions", transactionRoutes);

    app.use("/api/user", userRoutes);

    app.use("/api/company", companyRoutes);

    app.get("/", (req, res) => {
      res.send("API is running");
    });


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (err) {
    console.error("Błąd startu serwera:", err);
    process.exit(1);
  }
};

startServer();

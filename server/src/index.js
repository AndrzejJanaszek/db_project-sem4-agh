const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectMongo } = require("./db/mongo");
const authRoutes = require("./routes/authRoutes");

const startServer = async () => {
  try {
    await connectMongo();

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api", authRoutes);

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

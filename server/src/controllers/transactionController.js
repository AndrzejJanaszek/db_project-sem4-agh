const transactionServices = require("../services/transactionServices");

exports.createTransaction = async (req, res) => {
  const { userId, city, postcode, street, products } = req.body;
  try {
    const transactionId = await transactionServices.createTransaction(userId, city, postcode, street, products);
    res.status(201).json({ message: "Transakcja utworzona", transactionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const transactions = await transactionServices.getTransactionsByUser(userId);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

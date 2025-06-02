const db = require("../db/mysql");

exports.createTransaction = async (userId, city, postcode, street, products) => {
  const [result] = await db.query(
    "INSERT INTO transactions (user_id, timestamp, city, postcode, street) VALUES (?, NOW(), ?, ?, ?)",
    [userId, city, postcode, street]
  );
  const transactionId = result.insertId;

  for (const product of products) {
    await db.query(
      "INSERT INTO product_transaction (product_id, transaction_id, product_count) VALUES (?, ?, ?)",
      [product.productId, transactionId, product.count]
    );
  }

  return transactionId;
};

exports.getTransactionsByUser = async (userId) => {
  const [transactions] = await db.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );

  for (const transaction of transactions) {
    const [products] = await db.query(
      "SELECT pt.product_id, pt.product_count FROM product_transaction pt WHERE pt.transaction_id = ?",
      [transaction.id]
    );
    transaction.products = products;
  }

  return transactions;
};

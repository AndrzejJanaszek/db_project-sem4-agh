const db = require("../db/mysql"); // np. mysql2/promise

exports.addToCart = async (userId, productId, count) => {
  const [rows] = await db.query(
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );

  if (rows.length > 0) {
    // Jeśli produkt już w koszyku – zwiększ ilość
    await db.query(
      "UPDATE cart SET count = count + ? WHERE user_id = ? AND product_id = ?",
      [count, userId, productId]
    );
  } else {
    // Jeśli nie – dodaj nowy wpis
    await db.query(
      "INSERT INTO cart (user_id, product_id, count) VALUES (?, ?, ?)",
      [userId, productId, count]
    );
  }
};

exports.removeFromCart = async (userId, productId) => {
  await db.query(
    "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );
};

exports.updateProductCount = async (userId, productId, count) => {
  if (count <= 0) {
    await this.removeFromCart(userId, productId);
  } else {
    await db.query(
      "UPDATE cart SET count = ? WHERE user_id = ? AND product_id = ?",
      [count, userId, productId]
    );
  }
};

exports.getCart = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM cart WHERE user_id = ?",
    [userId]
  );
  return rows;
};
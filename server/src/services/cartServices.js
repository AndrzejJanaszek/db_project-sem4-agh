const db = require("../db/mysql"); // np. mysql2/promise
const Product = require("../models/Product"); // model mongoose

exports.addToCart = async (userId, productId, variantId, count) => {
  const [rows] = await db.query(
    "SELECT * FROM cart WHERE user_id = ? AND product_id = ? AND variant_id = ?",
    [userId, productId, variantId]
  );

  if (rows.length > 0) {
    // Jeśli produkt z danym wariantem już w koszyku – zwiększ ilość
    await db.query(
      "UPDATE cart SET count = count + ? WHERE user_id = ? AND product_id = ? AND variant_id = ?",
      [count, userId, productId, variantId]
    );
  } else {
    // Jeśli nie – dodaj nowy wpis
    await db.query(
      "INSERT INTO cart (user_id, product_id, variant_id, count) VALUES (?, ?, ?, ?)",
      [userId, productId, variantId, count]
    );
  }
};

exports.removeFromCart = async (userId, productId, variantId) => {
  await db.query(
    "DELETE FROM cart WHERE user_id = ? AND product_id = ? AND variant_id = ?",
    [userId, productId, variantId]
  );
};

exports.updateProductCount = async (userId, productId, variantId, count) => {
  if (count <= 0) {
    await this.removeFromCart(userId, productId, variantId);
  } else {
    await db.query(
      "UPDATE cart SET count = ? WHERE user_id = ? AND product_id = ? AND variant_id = ?",
      [count, userId, productId, variantId]
    );
  }
};


exports.getCart = async (userId) => {
  // 1. Pobierz dane z tabeli MySQL
  const [cartRows] = await db.query(
    "SELECT product_id, variant_id, count FROM cart WHERE user_id = ?",
    [userId]
  );

  if (cartRows.length === 0) return [];

  // 2. Zbierz unikalne product_id
  const productIds = [...new Set(cartRows.map(row => row.product_id))];

  // 3. Pobierz produkty z MongoDB
  const products = await Product.find({
    _id: { $in: productIds }
  }).lean();

  // 4. Zbuduj odpowiednią strukturę
  const cartMap = {};

  for (const row of cartRows) {
    const product = products.find(p => p._id.toString() === row.product_id);
    if (!product) continue;

    const variant = product.variants.find(v => v._id.toString() === row.variant_id);
    if (!variant) continue;

    if (!cartMap[product._id]) {
      cartMap[product._id] = {
        _id: product._id,
        name: product.name,
        description: product.description,
        images: product.images,
        variants: []
      };
    }

    cartMap[product._id].variants.push({
      ...variant,
      count: row.count,
      variantId: row.variant_id,
      productId: row.product_id
    });
  }

  return Object.values(cartMap);
};
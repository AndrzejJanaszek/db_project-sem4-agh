const db = require("../db/mysql");
const Product = require("../models/Product");

const cartServices = require("../services/cartServices");

exports.createTransaction = async (userId, city, postcode, street, products) => {
  console.log(userId, city, postcode, street, products);
  
  const [result] = await db.query(
    `INSERT INTO transactions (user_id, timestamp, city, postcode, street)
     VALUES (?, NOW(), ?, ?, ?)`,
    [userId, city, postcode, street]
  );
  const transactionId = result.insertId;

  for (const product of products) {
    // 1. Zapisz do MySQL
    await db.query(
      `INSERT INTO product_transaction 
       (transaction_id, product_company_id, product_id, variant_id, product_count)
       VALUES (?, ?, ?, ?, ?)`,
      [
        transactionId,
        product.companyId,
        product.productId,
        product.variantId,
        product.count
      ]
    );

    // 2. Zaktualizuj stan magazynowy w MongoDB
    await Product.updateOne(
      {
        _id: product.productId,
        companyId: product.companyId,
        "variants._id": product.variantId
      },
      {
        $inc: { "variants.$.count": -product.count }
      }
    );
  }

  // 3. Wyczyść koszyk użytkownika
  await cartServices.clearCart(userId);

  return transactionId;
};

exports.getTransactionsByUser = async (userId) => {
  const [transactions] = await db.query(
    `SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC`,
    [userId]
  );

  for (const transaction of transactions) {
    const [productEntries] = await db.query(
      `SELECT 
         pt.product_company_id,
         pt.product_id,
         pt.variant_id,
         pt.product_count
       FROM product_transaction pt
       WHERE pt.transaction_id = ?`,
      [transaction.id]
    );

    const enrichedProducts = [];

    for (const entry of productEntries) {
      const product = await Product.findOne({
        _id: entry.product_id,
        companyId: entry.product_company_id,
        "variants._id": entry.variant_id
      }).lean();

      if (!product) continue;

      // Znajdź wariant pasujący do kupionego
      const variant = product.variants.find(v => v._id.toString() === entry.variant_id);

      if (!variant) continue;

      // Skopiuj tylko kupiony wariant i dodaj ilość zakupioną
      const purchasedVariant = {
        ...variant,
        purchasedCount: entry.product_count
      };

      enrichedProducts.push({
        _id: product._id,
        name: product.name,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        subSubCategoryId: product.subSubCategoryId,
        companyId: product.companyId,
        variant: purchasedVariant
      });
    }

    transaction.products = enrichedProducts;
  }

  return transactions;
};
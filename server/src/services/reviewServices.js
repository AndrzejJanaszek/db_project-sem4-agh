const db = require("../db/mysql"); // mysql2/promise

exports.addReview = async (productId, userId, content, rating) => {
    const [result] = await db.query(
        "INSERT INTO product_reviews (product_id, user_id, content, rating) VALUES (?, ?, ?, ?)",
        [productId, userId, content, rating]
    );
    return result.insertId;
};

exports.deleteReview = async (reviewId) => {
    await db.query(
        "DELETE FROM product_reviews WHERE id = ?",
        [reviewId]
    );
};

exports.updateReview = async (reviewId, content, rating) => {
    const [result] = await db.query(
        "UPDATE product_reviews SET content = ?, rating = ? WHERE id = ?",
        [content, rating, reviewId]
    );

    if (result.affectedRows === 0) {
        throw new Error("Brak opinii o podanym ID.");
    }
};

exports.getReviewsByProductId = async (productId) => {
    const [rows] = await db.query(
        "SELECT * FROM product_reviews WHERE product_id = ?",
        [productId]
    );
    return rows;
};

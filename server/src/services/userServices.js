const db = require("../db/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUserByEmail = async (email) => {
    const [existingUsers] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return existingUsers[0];
};


exports.getUserById = async (id) => {
  const [users] = await db.query(
    `SELECT u.id, u.name, u.surname, u.email, a.city, a.postcode, a.street
     FROM users u
     JOIN address a ON u.address_id = a.id
     WHERE u.id = ?`,
    [id]
  );
  return users[0];
};

exports.createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const [addressResult] = await db.query(
    "INSERT INTO address (city, postcode, street) VALUES (?, ?, ?)",
    [user.city, user.postcode, user.street]
  );
  const addressId = addressResult.insertId;

  const [userResult] = await db.query(
    "INSERT INTO users (name, surname, email, password, address_id) VALUES (?, ?, ?, ?, ?)",
    [user.name, user.surname, user.email, hashedPassword, addressId]
  );

  return userResult.insertId;
};

exports.generateUserJWT = async (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        type: "user",   // TODO:
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
}

exports.deleteUser = async (id) => {
    const [result] = await db.query(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};

exports.updateUser = async (id, { name, surname, email, city, postcode, street }) => {
  const [users] = await db.query("SELECT address_id FROM users WHERE id = ?", [id]);

  if (users.length === 0) {
    throw new Error("User not found");
  }

  const addressId = users[0].address_id;

  // Sprawdzenie, czy email jest już zajęty przez innego użytkownika (inny niż aktualizowany)
  const [emailCheck] = await db.query(
    "SELECT id FROM users WHERE email = ? AND id <> ?",
    [email, id]
  );
  if (emailCheck.length > 0) {
    throw new Error("Podany email jest już zajęty");
  }

  await db.query(
    "UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?",
    [name, surname, email, id]
  );

  await db.query(
    "UPDATE address SET city = ?, postcode = ?, street = ? WHERE id = ?",
    [city, postcode, street, addressId]
  );

  return true;
};

exports.updateUserPassword = async (id, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, id]
    );
    return true;
};
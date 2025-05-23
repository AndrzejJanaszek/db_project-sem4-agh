const db = require("../db/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUserByEmail = async (email) => {
    console.log(db);
    
    const [existingUsers] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return existingUsers[0];
};

exports.getCompanyByEmail = async (email) => {
    const [existingUsers] = await db.query(
        "SELECT * FROM companies WHERE email = ?",
        [email]
    );

    return existingUsers[0];
};

exports.createUser = async (user) => {
    // zwraca id dodanego usera

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

exports.createCompany = async (company) => {
    // zwraca id dodanego usera
    const hashedPassword = await bcrypt.hash(company.password, 10);

    const [addressResult] = await db.query(
        "INSERT INTO address (city, postcode, street) VALUES (?, ?, ?)",
        [company.city, company.postcode, company.street]
    );
    const addressId = addressResult.insertId;

    const [companyResult] = await db.query(
        "INSERT INTO `companies` (`name`, `nip`, `email`, `password`, `address_id`) VALUES (?, ?, ?, ?, ?)",
        [company.companyName, company.nip, company.email, hashedPassword, addressId]
    );

    return companyResult.insertId;
};

exports.generateUserJWT = async (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
}

exports.generateCompanyJWT = async (company) => {
    const token = jwt.sign(
      {
        id: company.id,
        email: company.email,
        companyName: company.companyName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
}
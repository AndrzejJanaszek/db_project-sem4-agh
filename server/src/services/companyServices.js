const db = require("../db/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getCompanyByEmail = async (email) => {
    const [existingUsers] = await db.query(
        "SELECT * FROM companies WHERE email = ?",
        [email]
    );

    return existingUsers[0];
};

exports.getCompanyById = async (id) => {
    const [existingUsers] = await db.query(
        "SELECT * FROM companies WHERE id = ?",
        [id]
    );

    return existingUsers[0];
};

exports.createCompany = async (company) => {
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
};

exports.deleteCompany = async (id) => {
    const [result] = await db.query(
        "DELETE FROM companies WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};

exports.updateCompany = async (id, { name, nip, email, city, postcode, street }) => {
    const [companies] = await db.query(
        "SELECT address_id FROM companies WHERE id = ?",
        [id]
    );

    if (companies.length === 0) {
        throw new Error("Company not found");
    }

    const addressId = companies[0].address_id;

    await db.query(
        "UPDATE address SET city = ?, postcode = ?, street = ? WHERE id = ?",
        [city, postcode, street, addressId]
    );

    await db.query(
        "UPDATE companies SET name = ?, nip = ?, email = ? WHERE id = ?",
        [name, nip, email, id]
    );
};

exports.updateCompanyPassword = async (id, hashedPassword) => {
    await db.query(
        "UPDATE companies SET password = ? WHERE id = ?",
        [hashedPassword, id]
    );
    return true;
};
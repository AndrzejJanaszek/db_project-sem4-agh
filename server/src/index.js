const express = require("express");
const cors = require("cors");
require("dotenv").config(); //*------------

const { body, validationResult } = require("express-validator");
const mysql = require("mysql2/promise");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const JWT_SECRET = "tajny_klucz";

const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Imię jest wymagane")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Imię może zawierać tylko litery"),

  body("surname")
    .notEmpty()
    .withMessage("Nazwisko jest wymagane")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Nazwisko może zawierać tylko litery"),

  body("city")
    .notEmpty()
    .withMessage("Miasto jest wymagane")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Miasto może zawierać tylko litery"),

  body("street").notEmpty().withMessage("Ulica jest wymagana"),

  body("postcode")
    .notEmpty()
    .withMessage("Kod pocztowy jest wymagany")
    .matches(/^\d{2}-\d{3}$/)
    .withMessage("Kod pocztowy musi być w formacie XX-XXX"),

  body("email")
    .notEmpty()
    .withMessage("Email jest wymagany")
    .isEmail()
    .withMessage("Nieprawidłowy email"),

  body("password")
    .notEmpty()
    .withMessage("Hasło jest wymagane")
    .isLength({ min: 8 })
    .withMessage("Hasło musi mieć co najmniej 8 znaków")
    .matches(/[A-Z]/)
    .withMessage("Hasło musi zawierać przynajmniej jedną dużą literę")
    .matches(/[0-9]/)
    .withMessage("Hasło musi zawierać przynajmniej jedną cyfrę")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Hasło musi zawierać znak specjalny"),

  body("secPassword")
    .notEmpty()
    .withMessage("Powtórzone hasło jest wymagane")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Hasła się nie zgadzają");
      }
      return true;
    }),
];

const validateCompany = [
body("companyName")
  .notEmpty()
  .withMessage("Nazwa firmy jest wymagana")
  .matches(/^[\w\s\-\&\.]+$/i)
  .withMessage("Nazwa firmy może zawierać tylko litery, cyfry, spacje, myślniki, & i kropki"),

body("nip")
  .notEmpty()
  .withMessage("NIP jest wymagany")
  .matches(/^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/)
  .withMessage("NIP musi mieć 10 cyfr lub format XXX-XXX-XX-XX"),

  body("city")
    .notEmpty()
    .withMessage("Miasto jest wymagane")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Miasto może zawierać tylko litery"),

  body("street").notEmpty().withMessage("Ulica jest wymagana"),

  body("postcode")
    .notEmpty()
    .withMessage("Kod pocztowy jest wymagany")
    .matches(/^\d{2}-\d{3}$/)
    .withMessage("Kod pocztowy musi być w formacie XX-XXX"),

  body("email")
    .notEmpty()
    .withMessage("Email jest wymagany")
    .isEmail()
    .withMessage("Nieprawidłowy email"),

  body("password")
    .notEmpty()
    .withMessage("Hasło jest wymagane")
    .isLength({ min: 8 })
    .withMessage("Hasło musi mieć co najmniej 8 znaków")
    .matches(/[A-Z]/)
    .withMessage("Hasło musi zawierać przynajmniej jedną dużą literę")
    .matches(/[0-9]/)
    .withMessage("Hasło musi zawierać przynajmniej jedną cyfrę")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Hasło musi zawierać znak specjalny"),

  body("secPassword")
    .notEmpty()
    .withMessage("Powtórzone hasło jest wymagane")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Hasła się nie zgadzają");
      }
      return true;
    }),
];

const validateLogin = [
  body("email").isEmail().withMessage("Nieprawidłowy email"),
  body("password").notEmpty().withMessage("Hasło jest wymagane"),
];

app.post("/login/user", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Sprawdzenie czy user istnieje
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    const user = rows[0];

    // Porównanie haseł
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Wygenerowanie tokena JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.post("/login/company", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Sprawdzenie czy user istnieje
    const [rows] = await db.query("SELECT * FROM companies WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    const user = rows[0];

    // Porównanie haseł
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Wygenerowanie tokena JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.post("/register/user", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, email, password, city, street, postcode } = req.body;

  try {
    // sprawdzenie zajętości emaila
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email jest już zajęty" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Dodaj adres
    const [addressResult] = await db.query(
      "INSERT INTO address (city, postcode, street) VALUES (?, ?, ?)",
      [city, postcode, street]
    );
    const addressId = addressResult.insertId;

    // 2. Dodaj użytkownika z address_id
    await db.query(
      "INSERT INTO users (name, surname, email, password, address_id) VALUES (?, ?, ?, ?, ?)",
      [name, surname, email, hashedPassword, addressId]
    );

    res.status(201).json({ message: "Użytkownik zarejestrowany" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

app.post("/register/company", validateCompany, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { companyName, nip, email, password, city, street, postcode } = req.body;

  try {
    // sprawdzenie zajętości emaila
    const [existingUsers] = await db.query(
      "SELECT id FROM companies WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email jest już zajęty" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [addressResult] = await db.query(
      "INSERT INTO address (city, postcode, street) VALUES (?, ?, ?)",
      [city, postcode, street]
    );
    const addressId = addressResult.insertId;

    await db.query(
      "INSERT INTO `companies` (`name`, `nip`, `email`, `password`, `address_id`) VALUES (?, ?, ?, ?, ?)",
      [companyName, nip, email, hashedPassword, addressId]
    );

    res.status(201).json({ message: "Firma zarejestrowana" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Healthcheck (opcjonalny)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

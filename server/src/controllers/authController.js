const { validationResult } = require("express-validator");
const authServices = require("../services/authServices");
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, surname, email, password, city, street, postcode } = req.body;
    const user = { name, surname, email, password, city, street, postcode };

    try {
      // sprawdzenie zajętości emaila
      if (await authServices.getUserByEmail(user.email) !== undefined) {
        return res.status(400).json({ error: "Email jest już zajęty" });
      }
  
      await authServices.createUser(user);
      res.status(201).json({ message: "Użytkownik zarejestrowany" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera" });
    }
};

exports.registerCompany = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { companyName, nip, email, password, city, street, postcode } = req.body;
    const company = { companyName, nip, email, password, city, street, postcode };

    try {
      if (await authServices.getCompanyByEmail(company.email) !== undefined) {
        return res.status(400).json({ error: "Email jest już zajęty" });
      }
  
      await authServices.createCompany(company);
  
      res.status(201).json({ message: "Firma zarejestrowana" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Błąd serwera" });
    }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Sprawdzenie czy user istnieje
    const user = await authServices.getUserByEmail(email)
    if ( user === undefined) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Porównanie haseł
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Wygenerowanie tokena JWT
    const token = await authServices.generateUserJWT(user);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
}

exports.loginCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Sprawdzenie czy company istnieje
    const company = await authServices.getCompanyByEmail(email)
    if ( company === undefined) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Porównanie haseł
    console.log(company);
    
    const match = await bcrypt.compare(password, company.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    // Wygenerowanie tokena JWT
    const token = await authServices.generateCompanyJWT(company);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

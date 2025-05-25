const { validationResult } = require("express-validator");
const userServices = require("../services/userServices");
const companyServices = require("../services/companyServices");
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, surname, email, password, city, street, postcode } = req.body;
    const user = { name, surname, email, password, city, street, postcode };

    try {
      if (await userServices.getUserByEmail(user.email) !== undefined) {
        return res.status(400).json({ error: "Email jest już zajęty" });
      }
  
      await userServices.createUser(user);
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
      if (await companyServices.getCompanyByEmail(company.email) !== undefined) {
        return res.status(400).json({ error: "Email jest już zajęty" });
      }
  
      await companyServices.createCompany(company);
  
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
    const user = await userServices.getUserByEmail(email)
    if ( user === undefined) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    const token = await userServices.generateUserJWT(user);

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
    const company = await companyServices.getCompanyByEmail(email)
    if ( company === undefined) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }
    
    const match = await bcrypt.compare(password, company.password);
    if (!match) {
      return res.status(401).json({ error: "Nieprawidłowy email lub hasło" });
    }

    const token = await companyServices.generateCompanyJWT(company);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

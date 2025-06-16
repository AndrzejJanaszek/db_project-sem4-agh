const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const companyServices = require("../services/companyServices");

exports.updateCompany = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyId = req.user.id;
  const { name, nip, email, city, postcode, street } = req.body;

  try {
    await companyServices.updateCompany(companyId, { name, nip, email, city, postcode, street });
    res.status(200).json({ message: "Dane firmy zostały zaktualizowane" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera przy aktualizacji danych firmy" });
  }
};

exports.updateCompanyPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyId = req.user.id;
  const { password } = req.body;
  console.log(req.body);
  

  try {
    await companyServices.updateCompanyPassword(companyId, password);
    res.status(200).json({ message: "Hasło firmy zostało zmienione" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera przy zmianie hasła" });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    console.log("req.user", req.user);
    
    const company = await companyServices.getCompanyById(req.user.id);
    if (!company) {
      return res.status(404).json({ error: "Firma nie znaleziona" });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera" });
  }
};
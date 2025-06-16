const { validationResult } = require("express-validator");
const userServices = require("../services/userServices");

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user.id;
  const { name, surname, email, city, postcode, street } = req.body;

  try {
    await userServices.updateUser(userId, { name, surname, email, city, postcode, street });
    res.status(200).json({ message: "Dane użytkownika zostały zaktualizowane" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera przy aktualizacji danych użytkownika" });
  }
};

exports.updateUserPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user.id;
  const { password } = req.body;

  try {
    await userServices.updateUserPassword(userId, password);
    res.status(200).json({ message: "Hasło użytkownika zostało zmienione" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera przy zmianie hasła" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Użytkownik nie znaleziony" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Błąd serwera" });
  }
};
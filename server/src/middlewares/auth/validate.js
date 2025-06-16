const { body } = require("express-validator");

exports.validateUser = [
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

exports.validateCompany = [
body("companyName")
  .notEmpty()
  .withMessage("Nazwa firmy jest wymagana")
  .matches(/^[\w\s&.-]+$/i)
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

exports.validateLogin = [
  body("email").isEmail().withMessage("Nieprawidłowy email"),
  body("password").notEmpty().withMessage("Hasło jest wymagane"),
];

exports.validateUserUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Imię nie może być puste")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Imię może zawierać tylko litery"),

  body("surname")
    .optional()
    .notEmpty()
    .withMessage("Nazwisko nie może być puste")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Nazwisko może zawierać tylko litery"),

  body("city")
    .optional()
    .notEmpty()
    .withMessage("Miasto nie może być puste")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Miasto może zawierać tylko litery"),

  body("street").optional().notEmpty().withMessage("Ulica nie może być pusta"),

  body("postcode")
    .optional()
    .notEmpty()
    .withMessage("Kod pocztowy nie może być pusty")
    .matches(/^\d{2}-\d{3}$/)
    .withMessage("Kod pocztowy musi być w formacie XX-XXX"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email nie może być pusty")
    .isEmail()
    .withMessage("Nieprawidłowy email"),
];

exports.validateUserPasswordUpdate = [
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
];

exports.validateCompanyUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Nazwa firmy nie może być pusta")
    .matches(/^[\w\s&.-]+$/i)
    .withMessage("Nazwa firmy może zawierać tylko litery, cyfry, spacje, myślniki, & i kropki"),

  body("nip")
    .optional()
    .notEmpty()
    .withMessage("NIP nie może być pusty")
    .matches(/^(\d{3}-\d{3}-\d{2}-\d{2}|\d{10})$/)
    .withMessage("NIP musi mieć 10 cyfr lub format XXX-XXX-XX-XX"),

  body("city")
    .optional()
    .notEmpty()
    .withMessage("Miasto nie może być puste")
    .isAlpha("pl-PL", { ignore: " -" })
    .withMessage("Miasto może zawierać tylko litery"),

  body("street").optional().notEmpty().withMessage("Ulica nie może być pusta"),

  body("postcode")
    .optional()
    .notEmpty()
    .withMessage("Kod pocztowy nie może być pusty")
    .matches(/^\d{2}-\d{3}$/)
    .withMessage("Kod pocztowy musi być w formacie XX-XXX"),

  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email nie może być pusty")
    .isEmail()
    .withMessage("Nieprawidłowy email"),
];

exports.validateCompanyPasswordUpdate = [
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
];
const { body } = require("express-validator");

const registerValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name majburiy"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name majburiy"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("To'g'ri email kiriting")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Telefon raqam majburiy"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("To'g'ri email kiriting")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Parol majburiy"),
];

const amountValidator = [
  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Summa 0 dan katta bo'lishi kerak"),
];

module.exports = {
  registerValidator,
  loginValidator,
  amountValidator,
};
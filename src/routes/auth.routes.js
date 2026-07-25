const express = require("express");

const {
  register,
  login,
  logout,
} = require("../controllers/auth.controller");

const {
  registerValidator,
  loginValidator,
} = require("../utils/validators");

const validate = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.post("/logout", logout);

module.exports = router;
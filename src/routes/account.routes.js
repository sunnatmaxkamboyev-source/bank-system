const express = require("express");

const {
  createAccount,
  getMyAccount,
} = require("../controllers/account.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", protect, createAccount);

router.get("/my-account", protect, getMyAccount);

module.exports = router;
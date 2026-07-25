const express = require("express");

const {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} = require("../controllers/transaction.controller");

const protect = require("../middleware/auth.middleware");

const {
  amountValidator,
} = require("../utils/validators");

const validate = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/deposit",
  protect,
  amountValidator,
  validate,
  deposit
);

router.post(
  "/withdraw",
  protect,
  amountValidator,
  validate,
  withdraw
);

router.post(
  "/transfer",
  protect,
  amountValidator,
  validate,
  transfer
);

router.get("/history", protect, getTransactions);

module.exports = router;
const express = require("express");

const {
  getAllUsers,
  blockUser,
  unblockUser,
  getAllTransactions,
} = require("../controllers/admin.controller");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.patch(
  "/users/:userId/block",
  protect,
  adminOnly,
  blockUser
);

router.patch(
  "/users/:userId/unblock",
  protect,
  adminOnly,
  unblockUser
);

router.get(
  "/transactions",
  protect,
  adminOnly,
  getAllTransactions
);

module.exports = router;
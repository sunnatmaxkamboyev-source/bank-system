const Account = require("../models/Account");
const generateAccountNumber = require("../utils/generateAccountNumber");

// ==================== CREATE ACCOUNT ====================

const createAccount = async (req, res) => {
  try {
    // Userning allaqachon accounti bormi?
    const existingAccount = await Account.findOne({
      user: req.user._id,
    });

    if (existingAccount) {
      return res.status(409).json({
        message: "Sizda allaqachon bank account mavjud",
      });
    }

    // Yangi account yaratish
    const account = await Account.create({
      user: req.user._id,
      accountNumber: generateAccountNumber(),
    });

    res.status(201).json({
      message: "Bank account muvaffaqiyatli yaratildi",
      account: {
        id: account._id,
        accountNumber: account.accountNumber,
        balance: account.balance,
        currency: account.currency,
        status: account.status,
      },
    });
  } catch (error) {
    console.error("Create account error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// ==================== GET MY ACCOUNT ====================

const getMyAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        message: "Bank account topilmadi",
      });
    }

    res.status(200).json({
      message: "Bank account ma'lumotlari",
      account,
    });
  } catch (error) {
    console.error("Get account error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  createAccount,
  getMyAccount,
};
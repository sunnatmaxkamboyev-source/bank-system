const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// ==================== DEPOSIT ====================

const deposit = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "To'g'ri summa kiriting",
      });
    }

    const account = await Account.findOne({
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        message: "Bank account topilmadi",
      });
    }

    if (account.status !== "active") {
      return res.status(403).json({
        message: "Account faol emas",
      });
    }

    account.balance += Number(amount);

    await account.save();

    const transaction = await Transaction.create({
      user: req.user._id,
      toAccount: account._id,
      amount: Number(amount),
      type: "deposit",
      status: "completed",
      description: description || "Accountga pul qo'shildi",
    });

    res.status(200).json({
      message: "Pul muvaffaqiyatli qo'shildi",
      balance: account.balance,
      transaction,
    });
  } catch (error) {
    console.error("Deposit error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// ==================== WITHDRAW ====================

const withdraw = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "To'g'ri summa kiriting",
      });
    }

    const account = await Account.findOne({
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({
        message: "Bank account topilmadi",
      });
    }

    if (account.status !== "active") {
      return res.status(403).json({
        message: "Account faol emas",
      });
    }

    if (account.balance < Number(amount)) {
      return res.status(400).json({
        message: "Hisobingizda yetarli mablag' mavjud emas",
        balance: account.balance,
      });
    }

    account.balance -= Number(amount);

    await account.save();

    const transaction = await Transaction.create({
      user: req.user._id,
      fromAccount: account._id,
      amount: Number(amount),
      type: "withdraw",
      status: "completed",
      description: description || "Accountdan pul yechildi",
    });

    res.status(200).json({
      message: "Pul muvaffaqiyatli yechildi",
      balance: account.balance,
      transaction,
    });
  } catch (error) {
    console.error("Withdraw error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// ==================== TRANSFER ====================

const transfer = async (req, res) => {
  try {
    const { receiverAccountNumber, amount, description } = req.body;

    if (!receiverAccountNumber || !amount || amount <= 0) {
      return res.status(400).json({
        message: "Qabul qiluvchi account raqami va to'g'ri summa kiriting",
      });
    }

    const senderAccount = await Account.findOne({
      user: req.user._id,
    });

    if (!senderAccount) {
      return res.status(404).json({
        message: "Sizning accountingiz topilmadi",
      });
    }

    if (senderAccount.status !== "active") {
      return res.status(403).json({
        message: "Sizning accountingiz faol emas",
      });
    }

    if (senderAccount.balance < Number(amount)) {
      return res.status(400).json({
        message: "Hisobingizda yetarli mablag' mavjud emas",
      });
    }

    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!receiverAccount) {
      return res.status(404).json({
        message: "Qabul qiluvchi account topilmadi",
      });
    }

    if (receiverAccount.status !== "active") {
      return res.status(403).json({
        message: "Qabul qiluvchi account faol emas",
      });
    }

    if (
      senderAccount._id.toString() === receiverAccount._id.toString()
    ) {
      return res.status(400).json({
        message: "O'zingizga pul o'tkaza olmaysiz",
      });
    }

    senderAccount.balance -= Number(amount);
    receiverAccount.balance += Number(amount);

    await senderAccount.save();
    await receiverAccount.save();

    const transaction = await Transaction.create({
      user: req.user._id,
      fromAccount: senderAccount._id,
      toAccount: receiverAccount._id,
      amount: Number(amount),
      type: "transfer",
      status: "completed",
      description: description || "Pul o'tkazmasi",
    });

    res.status(200).json({
      message: "Pul muvaffaqiyatli o'tkazildi",
      balance: senderAccount.balance,
      transaction,
    });
  } catch (error) {
    console.error("Transfer error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// ==================== TRANSACTION HISTORY ====================

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    })
      .populate("fromAccount", "accountNumber")
      .populate("toAccount", "accountNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Transactionlar",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Get transactions error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getTransactions,
};
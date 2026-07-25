const User = require("../models/User");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// Barcha userlarni ko'rish
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// Userni block qilish
const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "blocked" },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User topilmadi",
      });
    }

    await Account.findOneAndUpdate(
      { user: userId },
      { status: "blocked" }
    );

    res.status(200).json({
      message: "User bloklandi",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// Userni unblock qilish
const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "active" },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User topilmadi",
      });
    }

    await Account.findOneAndUpdate(
      { user: userId },
      { status: "active" }
    );

    res.status(200).json({
      message: "User qayta faollashtirildi",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// Barcha transactionlarni ko'rish
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "firstName lastName email")
      .populate("fromAccount", "accountNumber")
      .populate("toAccount", "accountNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  getAllTransactions,
};
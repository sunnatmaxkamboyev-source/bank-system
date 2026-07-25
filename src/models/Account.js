const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    // Hisob egasi
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Bank hisob raqami
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // Hisobdagi pul
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Valyuta
    currency: {
      type: String,
      enum: ["UZS", "USD", "EUR"],
      default: "UZS",
    },

    // Hisob holati
    status: {
      type: String,
      enum: ["active", "blocked", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
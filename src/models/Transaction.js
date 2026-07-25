const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // Transaction egasi
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Qaysi accountdan
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    // Qaysi accountga
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },

    // Pul miqdori
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Transaction turi
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer"],
      required: true,
    },

    // Transaction status
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    // Izoh
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
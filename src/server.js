const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");
const adminRoutes = require("./routes/admin.routes");

const {
  notFound,
  errorHandler,
} = require("./middleware/error.middleware");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/accounts", accountRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bank Backend API ishlayapti 🚀",
  });
});

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} da ishga tushdi`);
});
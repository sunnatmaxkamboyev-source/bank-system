const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Cookie'dan tokenni olish
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Avval login qilishingiz kerak",
      });
    }

    // 2. JWT tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Userni database'dan topish
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User topilmadi",
      });
    }

    // 4. User bloklangan bo'lsa
    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Sizning akkauntingiz bloklangan",
      });
    }

    // 5. Userni request'ga qo'shish
    req.user = user;

    // 6. Keyingi controller'ga o'tish
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      message: "Token noto'g'ri yoki muddati tugagan",
    });
  }
};

module.exports = protect;
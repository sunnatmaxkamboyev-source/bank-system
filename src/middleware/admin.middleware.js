const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Avval login qiling",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Faqat admin uchun ruxsat berilgan",
    });
  }

  next();
};

module.exports = adminOnly;
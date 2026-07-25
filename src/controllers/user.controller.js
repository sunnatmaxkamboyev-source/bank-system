const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profil ma'lumotlari",
      user: req.user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server xatosi",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
};
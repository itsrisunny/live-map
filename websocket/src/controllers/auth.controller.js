const authService = require("../services/auth.service");

const validateAccount = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number required",
      });
    }

    const result = await authService.validateUserByPhone(phoneNumber);

    if (!result.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "OTP sent successfully",
      sessionInfo: result.sessionInfo,
      uid: result.uid,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { sessionInfo, code } = req.body;

    const result = await authService.verifyFirebaseToken(sessionInfo, code);

    return res.json({
      success: true,
      message: "OTP verified",
      idToken: result.idToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.response?.data?.error?.message || "Invalid OTP",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];

    const result = await authService.deleteUserByToken(idToken);

    return res.json({
      success: true,
      message: "User deleted successfully",
      uid: result.uid,
    });
  } catch (error) {
    console.error("Delete Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
};


module.exports = {
  validateAccount,
  verifyOtp,
  deleteAccount
};

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/validate-account", authController.validateAccount);
router.post("/verify-otp", authController.verifyOtp);
router.post("/delete-user", authController.deleteAccount);

module.exports = router;

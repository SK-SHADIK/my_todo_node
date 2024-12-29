const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Public routes
router.get("/", authController.registrationForm);
router.get("/registration", authController.registrationForm);
router.post("/store/registration", authController.storeRegistration);
router.get("/login", authController.loginForm);
router.post("/login", authController.storeLogin);

// Define logout route (can be accessed by any authenticated user)
router.get('/logout', authController.logout);

module.exports = router;

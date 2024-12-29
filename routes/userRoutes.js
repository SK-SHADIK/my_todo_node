// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// router.get("/", userController.getUsers);
router.get("/create", userController.createUserForm);
router.post("/create", userController.createUser);

module.exports = router;

// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);

// Route to display the create user form
router.get("/create", userController.createUserForm);

// Route to handle form submission (create user)
router.post("/create", userController.createUser);

module.exports = router;

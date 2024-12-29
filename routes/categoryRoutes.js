// userRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategory);
router.get("/create", categoryController.createCategoryForm);
// router.post("/create", categoryController.createCategory);

module.exports = router;

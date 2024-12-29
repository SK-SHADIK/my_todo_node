const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategory);
router.get("/create", categoryController.createCategoryForm);
router.post("/create", categoryController.createCategory);
router.get("/:category_id/view", categoryController.viewCategory);
router.get("/:category_id/edit", categoryController.editCategoryForm);
router.post("/edit", categoryController.updateCategory);
router.post("/:category_id/delete", categoryController.deleteCategory);

module.exports = router;

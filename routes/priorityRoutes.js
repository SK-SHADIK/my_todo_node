const express = require("express");
const router = express.Router();
const priorityController = require("../controllers/priorityController");

router.get("/", priorityController.getPriority);
router.get("/create", priorityController.createPriorityForm);
router.post("/create", priorityController.createPriority);
router.get("/:priority_id/view", priorityController.viewPriority);
router.get("/:priority_id/edit", priorityController.editPriorityForm);
router.post("/edit", priorityController.updatePriority);
router.post("/:priority_id/delete", priorityController.deletePriority);

module.exports = router;

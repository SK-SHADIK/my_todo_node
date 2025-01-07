const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTask);
router.get("/create", taskController.createTaskForm);
router.post("/create", taskController.createTask);
router.get("/:task_id/view", taskController.viewTask);
router.get("/:task_id/edit", taskController.editTaskForm);
router.post("/edit", taskController.updateTask);
router.post("/:task_id/delete", taskController.deleteTask);

module.exports = router;

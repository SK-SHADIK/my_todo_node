const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");

router.get("/", statusController.getStatus);
router.get("/create", statusController.createStatusForm);
router.post("/create", statusController.createStatus);
router.get("/:status_id/view", statusController.viewStatus);
router.get("/:status_id/edit", statusController.editStatusForm);
router.post("/edit", statusController.updateStatus);
router.post("/:status_id/delete", statusController.deleteStatus);

module.exports = router;

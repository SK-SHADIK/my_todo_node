const statusService = require("../services/statusServices");
const validateStatusName = require("../dtos/statusDTO");

class StatusController {
  // Fetch and render the list of Statuses
  async getStatus(req, res) {
    try {
      const userId = req.user.user_id; // Assuming user_id comes from JWT or session
      const statuses = await statusService.getAllStatus(userId); // Fetch statuses for this user

      res.render("statuses/status", { title: "Status List", statuses });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching statuses.");
    }
  }

  // Render the create Status form
  createStatusForm(req, res) {
    res.render("statuses/createStatus", { title: "Create New Status" });
  }

  // Create a new Status
  async createStatus(req, res) {
    const { status_name } = req.body;
    const userId = req.user.user_id; // Assuming user_id comes from JWT

    // Perform custom validation
    const errors = validateStatusName(status_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await statusService.createStatus(userId, status_name);
      res.redirect("/statuses");
    } catch (error) {
      console.error("Error creating status:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // View a specific status
  async viewStatus(req, res) {
    const { status_id } = req.params;

    try {
      const status = await statusService.getStatusById(status_id);

      if (!status) {
        return res.status(404).send("status not found");
      }

      res.render("statuses/viewStatus", { title: "Status Details", status });
    } catch (error) {
      console.error("Error fetching status details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Show the edit form for a specific status
  async editStatusForm(req, res) {
    const { status_id } = req.params;
    try {
      const status = await statusService.getStatusById(status_id);

      if (!status) {
        return res.status(404).send("Status not found");
      }

      res.render("statuses/editStatus", { title: "Edit Status", status });
    } catch (error) {
      console.error("Error fetching status for edit:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Update an existing status
  async updateStatus(req, res) {
    const { status_id, status_name } = req.body;

    // Perform custom validation
    const errors = validateStatusName(status_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const updatedStatus = await statusService.updateStatus(status_id, status_name);

      if (!updatedStatus) {
        return res.status(404).send("Status not found");
      }

      res.redirect(`/statuses`);
    } catch (error) {
      console.error("Error updating Status:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a Status
  async deleteStatus(req, res) {
    const { status_id } = req.params;

    try {
      const deletedStatus = await statusService.deleteStatus(status_id);

      if (!deletedStatus) {
        return res.status(404).send("Status not found");
      }

      res.redirect("/statuses"); // Redirect to the Status list after deletion
    } catch (error) {
      console.error("Error deleting Status:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new StatusController();

const priorityService = require("../services/priorityServices");
const validatePriorityName = require("../dtos/priorityDTO");

class PriorityController {
  // Fetch and render the list of priorities
  async getPriority(req, res) {
    try {
      const userId = req.user.user_id; // Assuming user_id comes from JWT or session
      const priorities = await priorityService.getAllPriority(userId); // Fetch priorities for this user

      res.render("priorities/priority", { title: "Priority List", priorities });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching priorities.");
    }
  }

  // Render the create Priority form
  createPriorityForm(req, res) {
    res.render("priorities/createPriority", { title: "Create New Priority" });
  }

  // Create a new Priority
  async createPriority(req, res) {
    const { priority_name } = req.body;
    const userId = req.user.user_id; // Assuming user_id comes from JWT

    // Perform custom validation
    const errors = validatePriorityName(priority_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await priorityService.createPriority(userId, priority_name);
      res.redirect("/priorities");
    } catch (error) {
      console.error("Error creating priority:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // View a specific priority
  async viewPriority(req, res) {
    const { priority_id } = req.params;

    try {
      const priority = await priorityService.getPriorityById(priority_id);

      if (!priority) {
        return res.status(404).send("Priority not found");
      }

      res.render("priorities/viewPriority", { title: "Priority Details", priority });
    } catch (error) {
      console.error("Error fetching priority details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Show the edit form for a specific priority
  async editPriorityForm(req, res) {
    const { priority_id } = req.params;
    try {
      const priority = await priorityService.getPriorityById(priority_id);

      if (!priority) {
        return res.status(404).send("Priority not found");
      }

      console.log(priority);
      res.render("priorities/editPriority", { title: "Edit Priority", priority });
    } catch (error) {
      console.error("Error fetching priority for edit:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Update an existing priority
  async updatePriority(req, res) {
    const { priority_id, priority_name } = req.body;

    // Perform custom validation
    const errors = validatePriorityName(priority_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const updatedPriority = await priorityService.updatePriority(priority_id, priority_name);

      if (!updatedPriority) {
        return res.status(404).send("Priority not found");
      }

      res.redirect(`/priorities`);
    } catch (error) {
      console.error("Error updating Priority:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a Priority
  async deletePriority(req, res) {
    const { priority_id } = req.params;

    try {
      const deletedPriority = await priorityService.deletePriority(priority_id);

      if (!deletedPriority) {
        return res.status(404).send("Priority not found");
      }

      res.redirect("/priorities"); // Redirect to the Priority list after deletion
    } catch (error) {
      console.error("Error deleting Priority:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new PriorityController();

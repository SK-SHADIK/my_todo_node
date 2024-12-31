const statusRepository = require("../repositories/statusRepositories");
const { v4: uuidv4 } = require("uuid"); // To generate UUID

class StatusService {
  // Get all Statuses
  async getAllStatus(userId) {
    try {
      return await statusRepository.getStatusesByUserId(userId); // Fetch Statuses where user_id matches
    } catch (error) {
      console.error("Error fetching Statuses:", error);
      throw error;
    }
  }

  async getStatusById(status_id) {
    try {
      return await statusRepository.getStatusById(status_id);
    } catch (error) {
      console.error("Error fetching status by ID:", error);
      throw error;
    }
  }

  // Create a new status
  async createStatus(userId, statusName) {
    try {
      const statusId = uuidv4(); // Generate a UUID for the status

      const status = {
        status_id: statusId,
        user_id: userId, // Associate status with the user
        status_name: statusName,
      };

      return await statusRepository.createStatus(status); // Save the status to the DB
    } catch (error) {
      console.error("Error creating status:", error);
      throw error;
    }
  }

  // Update the status
  async updateStatus(status_id, status_name) {
    try {
      const status = await statusRepository.getStatusById(status_id);
      if (!status) {
        throw new Error("status not found");
      }

      status.status_name = status_name;
      return await statusRepository.updateStatus(status);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  }
  // Delete a status
  async deleteStatus(status_id) {
    try {
      const status = await statusRepository.getStatusById(status_id);

      if (!status) {
        return null;  // If the status doesn't exist, return null
      }

      await statusRepository.deleteStatus(status_id);  // Call the repository to delete the status
      return status;  // Return the deleted status (or just return true if you prefer)
    } catch (error) {
      console.error("Error deleting status:", error);
      throw error;
    }
  }
}

module.exports = new StatusService();


const { AppDataSource } = require('../utils/db-connection');
const Status = require('../models/statusModel');

class StatusRepository {
  // Get all Statuses
  async getStatusesByUserId(userId) {
    try {
      const statusRepository = AppDataSource.getRepository(Status);
      // Fetch Statuses where user_id is equal to the logged-in user's user_id
      return await statusRepository.find({
        where: { user_id: userId }, // Query where user_id matches
        order: {
          id: 'DESC'
        },
      });
    } catch (error) {
      console.error("Error fetching Statuses by user_id:", error);
      throw new Error("Error fetching Statuses by user_id");
    }
  }

  // Get a Status by its ID
  async getStatusById(statusId) {
    try {
      const statusRepository = AppDataSource.getRepository(Status);
      return await statusRepository.findOneBy({ status_id: statusId });
    } catch (error) {
      console.error("Error fetching status by ID:", error);
      throw new Error("Error fetching status");
    }
  }

  // Create a new status
  async createStatus(statusData) {
    try {
      const statusRepository = AppDataSource.getRepository(Status);
      const newStatus = statusRepository.create(statusData);
      await statusRepository.save(newStatus);
      return newStatus;
    } catch (error) {
      console.error("Error creating Status:", error);
      throw new Error("Error creating Status");
    }
  }

  // Update Status
  async updateStatus(status) {
    try {
      const statusRepository = AppDataSource.getRepository(Status);
      return await statusRepository.save(status); // Save the updated status
    } catch (error) {
      console.error("Error updating status:", error);
      throw new Error("Error updating status");
    }
  }
  // Delete status by ID
  async deleteStatus(status_id) {
    try {
      const statusRepository = AppDataSource.getRepository(Status);
      const status = await statusRepository.findOneBy({ status_id });

      if (!status) {
        throw new Error("status not found");
      }

      await statusRepository.remove(status); // Remove the status from the database
      return status; // Return the deleted status (or just return true if preferred)
    } catch (error) {
      console.error("Error deleting status:", error);
      throw new Error("Error deleting status");
    }
  }
}

module.exports = new StatusRepository();


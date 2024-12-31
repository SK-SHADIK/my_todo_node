const priorityRepository = require("../repositories/priorityRepositories");
const { v4: uuidv4 } = require("uuid"); // To generate UUID

class PriorityService {
  // Get all Priorities
  async getAllPriority(userId) {
    try {
      return await priorityRepository.getPrioritiesByUserId(userId); // Fetch Priorities where user_id matches
    } catch (error) {
      console.error("Error fetching Priorities:", error);
      throw error;
    }
  }

  async getPriorityById(priority_id) {
    try {
      return await priorityRepository.getPriorityById(priority_id);
    } catch (error) {
      console.error("Error fetching priority by ID:", error);
      throw error;
    }
  }

  // Create a new priority
  async createPriority(userId, priorityName) {
    try {
      const priorityId = uuidv4(); // Generate a UUID for the priority

      const priority = {
        priority_id: priorityId,
        user_id: userId, // Associate priority with the user
        priority_name: priorityName,
      };

      return await priorityRepository.createPriority(priority); // Save the priority to the DB
    } catch (error) {
      console.error("Error creating priority:", error);
      throw error;
    }
  }

  // Update the priority
  async updatePriority(priority_id, priority_name) {
    try {
      const priority = await priorityRepository.getPriorityById(priority_id);
      if (!priority) {
        throw new Error("priority not found");
      }

      priority.priority_name = priority_name;
      return await priorityRepository.updatePriority(priority);
    } catch (error) {
      console.error("Error updating priority:", error);
      throw error;
    }
  }
  // Delete a priority
  async deletePriority(priority_id) {
    try {
      const priority = await priorityRepository.getPriorityById(priority_id);

      if (!priority) {
        return null;  // If the priority doesn't exist, return null
      }

      await priorityRepository.deletePriority(priority_id);  // Call the repository to delete the priority
      return priority;  // Return the deleted priority (or just return true if you prefer)
    } catch (error) {
      console.error("Error deleting priority:", error);
      throw error;
    }
  }
}

module.exports = new PriorityService();


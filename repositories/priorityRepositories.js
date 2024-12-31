const { AppDataSource } = require('../utils/db-connection');
const Priority = require('../models/priorityModel');

class PriorityRepository {
  // Get all priorities
  async getPrioritiesByUserId(userId) {
    try {
      const priorityRepository = AppDataSource.getRepository(Priority);
      // Fetch Priorities where user_id is equal to the logged-in user's user_id
      return await priorityRepository.find({
        where: { user_id: userId }, // Query where user_id matches
        order: {
          id: 'DESC'
        },
      });
    } catch (error) {
      console.error("Error fetching Priorities by user_id:", error);
      throw new Error("Error fetching Priorities by user_id");
    }
  }

  // Get a priority by its ID
  async getPriorityById(priorityId) {
    try {
      const priorityRepository = AppDataSource.getRepository(Priority);
      return await priorityRepository.findOneBy({ priority_id: priorityId });
    } catch (error) {
      console.error("Error fetching priority by ID:", error);
      throw new Error("Error fetching priority");
    }
  }

  // Create a new Priority
  async createPriority(priorityData) {
    try {
      const priorityRepository = AppDataSource.getRepository(Priority);
      const newPriority = priorityRepository.create(priorityData);
      await priorityRepository.save(newPriority);
      return newPriority;
    } catch (error) {
      console.error("Error creating priority:", error);
      throw new Error("Error creating priority");
    }
  }

  // Update priority
  async updatePriority(priority) {
    try {
      const priorityRepository = AppDataSource.getRepository(Priority);
      return await priorityRepository.save(priority); // Save the updated priority
    } catch (error) {
      console.error("Error updating priority:", error);
      throw new Error("Error updating priority");
    }
  }
  // Delete priority by ID
  async deletePriority(priority_id) {
    try {
      const priorityRepository = AppDataSource.getRepository(Priority);
      const priority = await priorityRepository.findOneBy({ priority_id });

      if (!priority) {
        throw new Error("priority not found");
      }

      await priorityRepository.remove(priority); // Remove the priority from the database
      return priority; // Return the deleted priority (or just return true if preferred)
    } catch (error) {
      console.error("Error deleting priority:", error);
      throw new Error("Error deleting priority");
    }
  }
}

module.exports = new PriorityRepository();


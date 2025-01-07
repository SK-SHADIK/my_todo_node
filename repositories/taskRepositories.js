const { AppDataSource } = require('../utils/db-connection');
const Task = require('../models/taskModel');

class TaskRepository {
  // Get all Tasks
  async getTasksByUserId(userId) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      // Fetch tasks where user_id is equal to the logged-in user's user_id
      return await taskRepository.find({
        where: { user_id: userId }, // Query where user_id matches
        order: {
          id: 'DESC'
        },
      });
    } catch (error) {
      console.error("Error fetching tasks by user_id:", error);
      throw new Error("Error fetching tasks by user_id");
    }
  }

  // Get a task by its ID
  async getTaskById(taskId) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      return await taskRepository.findOneBy({ task_id: taskId });
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw new Error("Error fetching task");
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const newTask = taskRepository.create(taskData);
      await taskRepository.save(newTask);
      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Error creating task");
    }
  }

  // Update task
  async updateTask(task) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      return await taskRepository.save(task); // Save the updated task
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Error updating task");
    }
  }
  // Delete task by ID
  async deleteTask(task_id) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOneBy({ task_id });

      if (!task) {
        throw new Error("task not found");
      }

      await taskRepository.remove(task); // Remove the task from the database
      return task; // Return the deleted task (or just return true if preferred)
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Error deleting task");
    }
  }
}

module.exports = new TaskRepository();


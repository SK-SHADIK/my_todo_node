const taskRepository = require("../repositories/taskRepositories");
const { v4: uuidv4 } = require("uuid"); // To generate UUID

class TaskService {
  // Get all tasks
  async getAllTask(userId) {
    try {
      return await taskRepository.getTasksByUserId(userId); // Fetch tasks where user_id matches
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async getTaskById(task_id) {
    try {
      return await taskRepository.getTaskById(task_id);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw error;
    }
  }

  // Create a new task
  async createTask(userId, task_name, category_id, due_date, status_id, description, priority_id, is_active) {
    try {
      // Generate a UUID for the task
      const taskId = uuidv4();

      // Create the task object
      const task = {
        task_id: taskId,
        user_id: userId,
        category_id: category_id,
        priority_id: priority_id,
        status_id: status_id,
        task_name: task_name,
        description: description,
        due_date: due_date,
        is_active: Boolean(is_active),
      };

      // Save the task to the database
      const result = await taskRepository.createTask(task);

      return result; // Return the saved task or result as needed
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error; // Re-throw error to be handled at a higher level
    }
  }


  // Update the task
  async updateTask(task_id, userId, task_name, category_id, due_date, status_id, description, priority_id, isActive) {
    try {
      const task = await taskRepository.getTaskById(task_id);
      if (!task) {
        throw new Error("task not found");
      }

      task.task_name = task_name;
      task.category_id = category_id;
      task.due_date = due_date;
      task.status_id = status_id;
      task.description = description;
      task.priority_id = priority_id;
      task.is_active = isActive;
      return await taskRepository.updateTask(task);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  // Delete a task
  async deleteTask(task_id) {
    try {
      const task = await taskRepository.getTaskById(task_id);

      if (!task) {
        return null;  // If the task doesn't exist, return null
      }

      await taskRepository.deleteTask(task_id);  // Call the repository to delete the task
      return task;  // Return the deleted task (or just return true if you prefer)
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}

module.exports = new TaskService();


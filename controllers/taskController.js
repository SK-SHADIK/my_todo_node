const taskService = require("../services/taskServices");
const categoryService = require("../services/categoryServices");
const statusService = require("../services/statusServices");
const priorityService = require("../services/priorityServices");
const validateTask = require("../dtos/taskDTO");

class TaskController {
  // Fetch and render the list of tasks
  async getTask(req, res) {
    try {
      const userId = req.user.user_id;
      const tasks = await taskService.getAllTask(userId);

      const category = await categoryService.getAllCategory();
      const status = await statusService.getAllStatus();
      const priority = await priorityService.getAllPriority();

      tasks.forEach(task => {
        task.category_name = category.find(category => category.category_id === task.category_id)?.category_name || 'N/A';
        task.status_name = status.find(status => status.status_id === task.status_id)?.status_name || 'N/A';
        task.priority_name = priority.find(priority => priority.priority_id === task.priority_id)?.priority_name || 'N/A';
      });

      res.render("tasks/task", { title: "Task List", tasks });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching tasks.");
    }
  }


  // Render the create task form
  async createTaskForm(req, res) {
    try {
      const categories = await categoryService.getAllCategory();
      const statuses = await statusService.getAllStatus();
      const priorities = await priorityService.getAllPriority();
      res.render("tasks/createTask", {
        title: "Create New Task",
        categories,
        statuses,
        priorities,
      });
    } catch (error) {
      console.error("Error fetching categories or statuses:", error);
      res.status(500).send("Internal Server Error");
    }
  }


  // Create a new Task
  async createTask(req, res) {
    const {
      task_name,
      description,
      category_id,
      due_date,
      status_id,
      priority_id,
      is_active,
    } = req.body;

    const userId = req.user.user_id;


    // Convert "on" to true, undefined to false, or keep it as boolean if already provided
    const isActive = is_active === "on" || is_active === true;

    // Perform custom validation
    const errors = validateTask({
      task_name,
      category_id,
      due_date,
      status_id,
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await taskService.createTask(
        userId,
        task_name,
        category_id,
        due_date,
        status_id,
        description,
        priority_id,
        isActive
      );

      // Redirect after successful creation
      res.redirect("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Internal Server Error");
    }
  }




  // View a specific task
  async viewTask(req, res) {
    const { task_id } = req.params;

    try {
      const task = await taskService.getTaskById(task_id);

      if (!task) {
        return res.status(404).send("task not found");
      }

      const category = await categoryService.getAllCategory();
      const status = await statusService.getAllStatus();
      const priority = await priorityService.getAllPriority();

        task.category_name = category.find(category => category.category_id === task.category_id)?.category_name || 'N/A';
        task.status_name = status.find(status => status.status_id === task.status_id)?.status_name || 'N/A';
        task.priority_name = priority.find(priority => priority.priority_id === task.priority_id)?.priority_name || 'N/A';

      res.render("tasks/viewTask", { title: "Task Details", task });
    } catch (error) {
      console.error("Error fetching task details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Show the edit form for a specific task
  async editTaskForm(req, res) {
    const { task_id } = req.params;
    try {

      const categories = await categoryService.getAllCategory();
      const statuses = await statusService.getAllStatus();
      const priorities = await priorityService.getAllPriority();

      const task = await taskService.getTaskById(task_id);

      if (!task) {
        return res.status(404).send("Task not found");
      }

      res.render("tasks/editTask", { title: "Edit Task", task, categories, statuses, priorities });
    } catch (error) {
      console.error("Error fetching task for edit:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Update an existing task
  async updateTask(req, res) {
    const {
      task_id,
      task_name,
      description,
      category_id,
      due_date,
      status_id,
      priority_id,
      is_active,
    } = req.body;

    const userId = req.user.user_id;

    // Convert "on" to true, undefined to false, or keep it as boolean if already provided
    const isActive = is_active === "on" || is_active === true;

    // Perform custom validation
    const errors = validateTask({
      task_name,
      category_id,
      due_date,
      status_id,
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const updatedTask = await taskService.updateTask(
        task_id, 
        userId,
        task_name,
        category_id,
        due_date,
        status_id,
        description,
        priority_id,
        isActive
      );

      if (!updatedTask) {
        return res.status(404).send("Task not found");
      }

      res.redirect(`/tasks`);
    } catch (error) {
      console.error("Error updating Task:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a Task
  async deleteTask(req, res) {
    const { task_id } = req.params;

    try {
      const deletedTask = await taskService.deleteTask(task_id);

      if (!deletedTask) {
        return res.status(404).send("Task not found");
      }

      res.redirect("/tasks"); // Redirect to the Task list after deletion
    } catch (error) {
      console.error("Error deleting Task:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new TaskController();

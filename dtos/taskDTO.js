function validateTask({ task_name, category_id, due_date, status_id }) {
  const errors = [];

  if (!task_name || typeof task_name !== "string" || task_name.length > 255) {
    errors.push("Invalid task name. It must be a string and less than 255 characters.");
  }

  if (!category_id || typeof category_id !== "string") {
    errors.push("Invalid category ID.");
  }

  if (due_date && isNaN(Date.parse(due_date))) {
    errors.push("Invalid due date format.");
  }

  if (!status_id || typeof status_id !== "string") {
    errors.push("Invalid status ID.");
  }

  return errors;
}

module.exports = validateTask;
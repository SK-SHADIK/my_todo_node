
function validatePriorityName(priorityName) {
    const errors = [];
  
    if (!priorityName || priorityName.trim() === '') {
      errors.push('Priority name is required.');
    }
  
    return errors;
  }
  
  module.exports = validatePriorityName;
  
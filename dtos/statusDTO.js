
function validateStatusName(statusName) {
    const errors = [];
  
    if (!statusName || statusName.trim() === '') {
      errors.push('Status name is required.');
    }
  
    return errors;
  }
  
  module.exports = validateStatusName;
  
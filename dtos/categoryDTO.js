
function validateCategoryName(categoryName) {
    const errors = [];
  
    if (!categoryName || categoryName.trim() === '') {
      errors.push('Category name is required.');
    }
  
    return errors;
  }
  
  module.exports = validateCategoryName;
  
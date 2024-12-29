const categoryRepository = require("../repositories/categoryRepositories");
const { v4: uuidv4 } = require("uuid"); // To generate UUID

class CategoryService {
  // Get all categories
  async getAllCategory() {
    try {
      return await categoryRepository.getAllCategory();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Create a new category
  async createCategory(userId, categoryName) {
    try {
      const categoryId = uuidv4(); // Generate a UUID for the category

      const category = {
        category_id: categoryId,
        user_id: userId, // Associate category with the user
        category_name: categoryName,
      };

      return await categoryRepository.createCategory(category); // Save the category to the DB
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
}

module.exports = new CategoryService();

const categoryRepository = require("../repositories/categoryRepositories");
const { v4: uuidv4 } = require("uuid"); // To generate UUID

class CategoryService {
  // Get all categories
  async getAllCategory(userId) {
    try {
      return await categoryRepository.getCategoriesByUserId(userId); // Fetch categories where user_id matches
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async getCategoryById(category_id) {
    try {
      return await categoryRepository.getCategoryById(category_id);
    } catch (error) {
      console.error("Error fetching category by ID:", error);
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

  // Update the category
  async updateCategory(category_id, category_name) {
    try {
      const category = await categoryRepository.getCategoryById(category_id);
      if (!category) {
        throw new Error("Category not found");
      }

      category.category_name = category_name;
      return await categoryRepository.updateCategory(category);
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }
  // Delete a category
  async deleteCategory(category_id) {
    try {
      const category = await categoryRepository.getCategoryById(category_id);

      if (!category) {
        return null;  // If the category doesn't exist, return null
      }

      await categoryRepository.deleteCategory(category_id);  // Call the repository to delete the category
      return category;  // Return the deleted category (or just return true if you prefer)
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

module.exports = new CategoryService();


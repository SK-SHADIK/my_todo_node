const { AppDataSource } = require('../utils/db-connection');
const Category = require('../models/categoryModel');

class CategoryRepository {
  // Get all categories
  async getCategoriesByUserId(userId) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      // Fetch categories where user_id is equal to the logged-in user's user_id
      return await categoryRepository.find({
        where: { user_id: userId }, // Query where user_id matches
      });
    } catch (error) {
      console.error("Error fetching categories by user_id:", error);
      throw new Error("Error fetching categories by user_id");
    }
  }

  // Get a category by its ID
  async getCategoryById(categoryId) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      return await categoryRepository.findOneBy({ category_id: categoryId });
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw new Error("Error fetching category");
    }
  }

  // Create a new category
  async createCategory(categoryData) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const newCategory = categoryRepository.create(categoryData);
      await categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  }

  // Update category
  async updateCategory(category) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      return await categoryRepository.save(category); // Save the updated category
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Error updating category");
    }
  }
  // Delete category by ID
  async deleteCategory(category_id) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const category = await categoryRepository.findOneBy({ category_id });

      if (!category) {
        throw new Error("Category not found");
      }

      await categoryRepository.remove(category); // Remove the category from the database
      return category; // Return the deleted category (or just return true if preferred)
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Error deleting category");
    }
  }
}

module.exports = new CategoryRepository();


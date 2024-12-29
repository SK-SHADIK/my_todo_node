const { AppDataSource } = require('../utils/db-connection');
const Category = require('../models/categoryModel');

class CategoryRepository {
  // Get all categories
  async getAllCategory() {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      return await categoryRepository.find();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Error fetching categories");
    }
  }

  // Create a new category
  async createCategory(categoryData) {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);

      // Create a new category entity
      const newCategory = categoryRepository.create(categoryData);

      // Save the category to the database
      await categoryRepository.save(newCategory);

      return newCategory; // Return the newly created category
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Error creating category");
    }
  }
}

module.exports = new CategoryRepository();

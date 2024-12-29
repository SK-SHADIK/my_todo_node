const { AppDataSource } = require('../utils/db-connection');
const Category = require('../models/categoryModel');

class CategoryRepository {
  // Get all category
  async getAllCategory() {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      return await categoryRepository.find();
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error("Error fetching category");
    }
  }

  // Create a new user
  // async createUser(user_id, name, email, password) {
  //   try {
  //     const userRepository = AppDataSource.getRepository(User);

  //     // Create a new user entity
  //     const newUser = userRepository.create({ user_id, name, email, password });

  //     // Save the user to the database
  //     await userRepository.save(newUser);

  //     return newUser; // Return the newly created user
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     throw new Error("Error creating user");
  //   }
  // }
}

module.exports = new CategoryRepository();

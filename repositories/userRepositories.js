const { AppDataSource } = require('../utils/db-connection');
const User = require('../models/userModel');

class UserRepository {
  // Get all users
  async getAllUsers() {
    try {
      const userRepository = AppDataSource.getRepository(User);
      return await userRepository.find();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  }

  // Create a new user
  async createUser(name, email, password) {
    try {
      const userRepository = AppDataSource.getRepository(User);

      // Create a new user entity
      const newUser = userRepository.create({ name, email, password });

      // Save the user to the database
      await userRepository.save(newUser);

      return newUser; // Return the newly created user
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }
}

module.exports = new UserRepository();

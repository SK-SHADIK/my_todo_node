const bcrypt = require('bcrypt');
const userRepository = require("../repositories/userRepositories");
const crypto = require("crypto");

class UserService {
  // Get all users
  async getAllUsers() {
    try {
      return await userRepository.getAllUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Create a new user
  async createUser(name, email, password) {
    try {
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
      const user_id = crypto.randomUUID();  // Generate UUID for the user

      // Use the repository to create and save the new user
      const user = await userRepository.createUser(user_id, name, email, hashedPassword);

      return user; // Return the newly created user
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

module.exports = new UserService();

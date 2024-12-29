const { v4: uuidv4 } = require('uuid');  // Import the uuid package
const { AppDataSource } = require('../utils/db-connection');
const User = require('../models/userModel');

class AuthRepository {

  // Create a new user
  async createUser(name, email, password) {
    try {
      const authRepository = AppDataSource.getRepository(User);

      // Generate a UUID for the user
      const userId = uuidv4();

      // Create a new user entity
      const newUser = authRepository.create({ 
        user_id: userId,  // Store UUID in the user_id column
        name, 
        email, 
        password 
      });

      // Save the user to the database
      await authRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Error creating user");
    }
  }

  // Find user by email
  async findUserByEmail(email) {
    try {
      const authRepository = AppDataSource.getRepository(User);
      return await authRepository.findOne({ where: { email } });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Error fetching user by email");
    }
  }
}

module.exports = new AuthRepository();

const categoryRepository = require("../repositories/categoryRepositories");

class CategoryService {
  // Get all users
  async getAllCategory() {
    try {
      return await categoryRepository.getAllCategory();
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  // Create a new user
  // async createUser(name, email, password) {
  //   try {
  //     // Hash the password before saving it
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const user_id = crypto.randomUUID();  // Generate UUID for the user

  //     // Use the repository to create and save the new user
  //     const user = await userRepository.createUser(user_id, name, email, hashedPassword);

  //     return user; // Return the newly created user
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     throw error;
  //   }
  // }
}

module.exports = new CategoryService();

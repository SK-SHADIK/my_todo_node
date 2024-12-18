const userService = require("../services/userServices");

class UserController {
  // Fetch and render the list of users
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.render("user/users", { title: "Users List", users });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching users.");
    }
  }

  // Render the create user form
  createUserForm(req, res) {
    res.render("user/createUser", { title: "Create New User" });
  }

  // Create user method (called from your route handler)
  async createUser(req, res) {
    // Destructure the data from req.body
    const { name, email, password } = req.body;

    try {
      // Call the createUser method from UserService
      const user = await userService.createUser(name, email, password);

      // Redirect to the users list page after successful creation
      res.redirect('/users'); 
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new UserController();

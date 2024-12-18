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
        const { name, email, password } = req.body;

        try {
            const user = await userService.createUser(name, email, password);
            res.redirect('/user/users'); // Redirect to user list after successful creation
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController(); // Export the instance of the UserController

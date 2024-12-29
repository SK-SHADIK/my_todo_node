const categoryService = require("../services/categoryServices");

class CategoryController {
  // Fetch and render the list of users
  async getCategory(req, res) {
    try {
      const categories = await categoryService.getAllCategory();
      res.render("categories/category", { title: "Category List", categories });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching category.");
    }
  }

  // Render the create user form
  createCategoryForm(req, res) {
    res.render("categories/createCategory", { title: "Create New Category" });
  }

  // // Create user method (called from your route handler)
  // async createUser(req, res) {
  //   // Destructure the data from req.body
  //   const { name, email, password } = req.body;

  //   try {
  //     // Call the createUser method from UserService
  //     const user = await userService.createUser(name, email, password);

  //     // Redirect to the users list page after successful creation
  //     res.redirect('/users'); 
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // }
}

module.exports = new CategoryController();

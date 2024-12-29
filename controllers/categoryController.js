const categoryService = require("../services/categoryServices");
const validateCategoryName = require("../dtos/categoryDTO");

class CategoryController {
  // Fetch and render the list of categories
  async getCategory(req, res) {
    try {
      const categories = await categoryService.getAllCategory();
      res.render("categories/category", { title: "Category List", categories });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching categories.");
    }
  }

  // Render the create category form
  createCategoryForm(req, res) {
    res.render("categories/createCategory", { title: "Create New Category" });
  }

  // Create a new category
  async createCategory(req, res) {
    const { category_name } = req.body;
    const userId = req.user.user_id; // Assuming the user object from the JWT contains the user_id.

    // Perform custom validation
    const errors = validateCategoryName(category_name);

    if (errors.length > 0) {
      // If there are validation errors, return them in the response
      return res.status(400).json({ errors });
    }

    try {
      // Call the service to create the category
      const category = await categoryService.createCategory(userId, category_name);
      res.redirect("/categories"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CategoryController();

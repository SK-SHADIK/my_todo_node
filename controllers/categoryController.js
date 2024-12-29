// categoryController.js
const categoryService = require("../services/categoryServices");
const validateCategoryName = require("../dtos/categoryDTO");

class CategoryController {
  // Fetch and render the list of categories
  async getCategory(req, res) {
    try {
      const userId = req.user.user_id; // Assuming user_id comes from JWT or session
      const categories = await categoryService.getAllCategory(userId); // Fetch categories for this user

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
    const userId = req.user.user_id; // Assuming user_id comes from JWT

    // Perform custom validation
    const errors = validateCategoryName(category_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await categoryService.createCategory(userId, category_name);
      res.redirect("/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // View a specific category
  async viewCategory(req, res) {
    const { category_id } = req.params;

    try {
      const category = await categoryService.getCategoryById(category_id);

      if (!category) {
        return res.status(404).send("Category not found");
      }

      res.render("categories/viewCategory", { title: "Category Details", category });
    } catch (error) {
      console.error("Error fetching category details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Show the edit form for a specific category
  async editCategoryForm(req, res) {
    const { category_id } = req.params;

    try {
      const category = await categoryService.getCategoryById(category_id);

      if (!category) {
        return res.status(404).send("Category not found");
      }

      res.render("categories/editCategory", { title: "Edit Category", category });
    } catch (error) {
      console.error("Error fetching category for edit:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // Update an existing category
  async updateCategory(req, res) {
    const { category_id, category_name } = req.body;

    // Perform custom validation
    const errors = validateCategoryName(category_name);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const updatedCategory = await categoryService.updateCategory(category_id, category_name);

      if (!updatedCategory) {
        return res.status(404).send("Category not found");
      }

      res.redirect(`/categories`);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete a category
  async deleteCategory(req, res) {
    const { category_id } = req.params;

    try {
      const deletedCategory = await categoryService.deleteCategory(category_id);

      if (!deletedCategory) {
        return res.status(404).send("Category not found");
      }

      res.redirect("/categories"); // Redirect to the category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CategoryController();

const express = require("express");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categorycontroller");

const router = express.Router();

// GET all categories
router.get("/", getCategories);

// GET a single category by ID
router.get("/:id", getCategoryById);

// POST a new category
router.post("/categoryupload", createCategory);

// PUT (update) a category
router.put("/:id", updateCategory);

// DELETE a category
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;

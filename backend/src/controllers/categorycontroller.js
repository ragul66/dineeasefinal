const Category = require("../modules/category");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage for category and subcategory photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir =
      file.fieldname === "categoryphoto"
        ? "uploads/categories/category"
        : "uploads/categories/subcategory";
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Controller functions

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// GET a category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// POST a new category
const createCategory = [
  upload.fields([
    { name: "categoryphoto", maxCount: 1 },
    { name: "subcategoryphoto", maxCount: 10 }, // Adjust maxCount as needed
  ]),
  async (req, res) => {
    try {
      const { category, subcategories } = req.body;

      // Get category photo path
      const categoryphoto = req.files["categoryphoto"]
        ? req.files["categoryphoto"][0].path
        : null;

      // Parse subcategories JSON and match each with the uploaded images
      const subcategoryData = JSON.parse(subcategories).map((sub, index) => ({
        name: sub.name,
        photo:
          req.files["subcategoryphoto"] && req.files["subcategoryphoto"][index]
            ? req.files["subcategoryphoto"][index].path
            : null,
      }));

      // Create new category document
      const newCategory = new Category({
        category,
        categoryphoto,
        subcategories: subcategoryData,
      });

      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Error creating category" });
    }
  },
];

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    // Delete category images from filesystem
    if (category.categoryphoto)
      fs.unlinkSync(path.join(__dirname, "..", category.categoryphoto));
    if (category.subcategoryphoto)
      fs.unlinkSync(path.join(__dirname, "..", category.subcategoryphoto));

    await category.remove();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};

const updateCategory = [
  upload.fields([{ name: "categoryphoto" }, { name: "subcategoryphoto" }]),
  async (req, res) => {
    try {
      const { category, subcategory } = req.body;
      const updatedFields = { category, subcategory };

      // Handle image updates
      if (req.files["categoryphoto"]) {
        const categoryphotoPath = req.files["categoryphoto"][0].path;
        updatedFields.categoryphoto = categoryphotoPath;
      }
      if (req.files["subcategoryphoto"]) {
        const subcategoryphotoPath = req.files["subcategoryphoto"][0].path;
        updatedFields.subcategoryphoto = subcategoryphotoPath;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );
      if (!updatedCategory)
        return res.status(404).json({ error: "Category not found" });

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Error updating category" });
    }
  },
];

// PUT (update) a category
// const updateCategory = [
//   upload.fields([{ name: "categoryphoto" }, { name: "subcategoryphoto" }]),
//   async (req, res) => {
//     try {
//       const { category, subcategory } = req.body;
//       const updatedFields = {
//         categoryphoto,
//         subcategoryphoto,
//       };

//       if (req.files["categoryphoto"]) {
//         updatedFields.categoryphoto = req.files["categoryphoto"][0].path;
//       }

//       if (req.files["subcategoryphoto"]) {
//         updatedFields.subcategoryphoto = req.files["subcategoryphoto"][0].path;
//       }

//       const updatedCategory = await Category.findByIdAndUpdate(
//         req.params.id,
//         updatedFields,
//         { new: true }
//       );
//       if (!updatedCategory) {
//         return res.status(404).json({ error: "Category not found" });
//       }

//       res.status(200).json(updatedCategory);
//     } catch (error) {
//       res.status(500).json({ error: "Error updating category" });
//     }
//   },
// ];

// DELETE a category
// const deleteCategory = async (req, res) => {
//   try {
//     const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//     if (!deletedCategory) {
//       return res.status(404).json({ error: "Category not found" });
//     }
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting category" });
//   }
// };

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

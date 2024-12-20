const express = require("express");
const multer = require("multer");
const Food = require("../modules/Food");
const Admin = require("../modules/admin"); // Admin model
const Hotel = require("../modules/hoteldetail");
const router = express.Router(); // Change router to express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Fooditems");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST: Add a new food item
// router.post(
//   "/add-fooditem/:userId",
//   upload.single("foodphoto"),
//   async (req, res) => {
//     try {
//       const { foodname, description, price, timing, category, subcategory } =
//         req.body;
//       const foodphoto = req.file ? req.file.path : null;
//       const { userId } = req.params;

//       const fooditem = new Food({
//         foodname,
//         foodphoto,
//         description,
//         price,
//         timing,
//         category,
//         subcategory,
//       });

//       const savedFood = await fooditem.save();

//       const admin = await Admin.findById(userId);
//       if (!admin) {
//         return res.status(404).json({ error: "Admin not found" });
//       }

//       admin.FoodItem.push(savedFood._id);
//       await admin.save();

//       res.status(201).json(savedFood);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to add food item" });
//     }
//   }
// );

// POST: Add a new food item
router.post(
  "/add-fooditem/:userId/:hotelId",
  upload.single("foodphoto"),
  async (req, res) => {
    try {
      const { foodname, description, price, timing, category, subcategory } =
        req.body;
      const foodphoto = req.file ? req.file.path : null;
      const { userId, hotelId } = req.params;

      const fooditem = new Food({
        foodname,
        foodphoto,
        description,
        price,
        timing,
        category,
        subcategory,
      });

      const savedFood = await fooditem.save();

      // Add food item to the Admin's FoodItem array
      const admin = await Admin.findById(userId);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      admin.FoodItem.push(savedFood._id);
      await admin.save();

      // Add food item to the Hotel's FoodItem array
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      hotel.FoodItem.push(savedFood._id);
      await hotel.save();

      res.status(201).json(savedFood);
    } catch (error) {
      res.status(500).json({ error: "Failed to add food item" });
    }
  }
);

// GET: Retrieve all food items for an admin
router.get("/fooditems/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const admin = await Admin.findById(userId).populate("FoodItem");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin.FoodItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve food items" });
  }
});

// Get full details of food items by hotel ID
router.get("/hotels/:hotelId/food-items", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId).populate("FoodItem"); // Populate FoodItem details

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(hotel.FoodItem); // Return the populated FoodItem array with full details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a food item by ID
router.put(
  "/update-fooditem/:userId/:foodId",
  upload.single("foodphoto"),
  async (req, res) => {
    try {
      const { userId, foodId } = req.params;
      const { foodname, description, price, timing } = req.body;
      const foodphoto = req.file ? req.file.path : null;

      const admin = await Admin.findById(userId);
      if (!admin || !admin.FoodItem.includes(foodId)) {
        return res.status(404).json({ error: "Admin or food item not found" });
      }

      const updatedFood = await Food.findByIdAndUpdate(
        foodId,
        { foodname, description, price, timing, foodphoto },
        { new: true }
      );

      res.json(updatedFood);
    } catch (error) {
      res.status(500).json({ error: "Failed to update food item" });
    }
  }
);

// DELETE: Remove a food item by ID
router.delete("/delete-fooditem/:userId/:foodId", async (req, res) => {
  try {
    const { userId, foodId } = req.params;

    const admin = await Admin.findById(userId);
    if (!admin || !admin.FoodItem.includes(foodId)) {
      return res.status(404).json({ error: "Admin or food item not found" });
    }

    await Food.findByIdAndDelete(foodId);

    admin.FoodItem = admin.FoodItem.filter(
      (item) => item.toString() !== foodId
    );
    await admin.save();

    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

module.exports = router;

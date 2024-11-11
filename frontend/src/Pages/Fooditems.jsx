import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

function Fooditems() {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hotels, sethotels] = useState([]);
  // {
  //   console.log(hotels);
  // }
  const [foodData, setFoodData] = useState({
    foodname: "",
    description: "",
    price: "",
    timing: "",
    category: "",
    subcategory: "",
  });
  const [foodPhoto, setFoodPhoto] = useState(null);
  const userId = localStorage.getItem("userId");
  const hotelId = localStorage.getItem("hotelId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Function to open the image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Function to open the edit modal
  const openEditModal = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
    // Set subcategories based on the category of the item being edited
    const selectedCategory = categories.find(
      (cat) => cat.category === item.category
    );
    setAvailableSubcategories(
      selectedCategory ? selectedCategory.subcategories : []
    );
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  // Function to handle form submission for updating item details
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(editItem); // Trigger the update callback
    closeEditModal();
  };

  //fetch the hotelId and store it to the localstorage
  // Fetch hotel details for the ID and save hotelId to localStorage
  const fetchhotels = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}hotel/admin-hotels/${userId}`
      );

      if (!response.ok) throw new Error("Failed to fetch hotels");

      const data = await response.json();
      // console.log("Fetched hotel data:", data); // Check structure

      if (Array.isArray(data.hotels)) {
        sethotels(data.hotels); // Set the hotels state with the array from data.hotels
        localStorage.setItem("hotelId", data.hotels[0]._id); // Save array of IDs
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    fetchhotels();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}category`);

      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Update subcategories when category changes
  useEffect(() => {
    if (foodData.category) {
      const selectedCategory = categories.find(
        (cat) => cat.category === foodData.category
      );

      if (selectedCategory) {
        setAvailableSubcategories(selectedCategory.subcategories);
        setFoodData((prev) => ({ ...prev, subcategory: "" }));
      }
    }
  }, [foodData.category, categories]);

  // Fetch food items for the admin
  const fetchFoodItems = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}food/fooditems/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch food items");

      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Failed to fetch food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setFoodPhoto(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.category === value);
      setAvailableSubcategories(
        selectedCategory ? selectedCategory.subcategories : []
      );
      setFoodData((prev) => ({
        ...prev,
        subcategory: "",
      }));
    }
  };

  // Form submission to add food item
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodname", foodData.foodname);
    formData.append("description", foodData.description);
    formData.append("price", foodData.price);
    formData.append("timing", foodData.timing);
    formData.append("category", foodData.category);
    formData.append("subcategory", foodData.subcategory);
    if (foodPhoto) {
      formData.append("foodphoto", foodPhoto);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}food/add-fooditem/${userId}/${hotelId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        await fetchFoodItems();
        setFoodData({
          foodname: "",
          description: "",
          price: "",
          timing: "",
          category: "",
          subcategory: "",
        });
        setFoodPhoto(null);
      } else {
        console.error("Failed to add food item");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 font-primary">
      <h1 className="text-2xl font-bold mb-4">Create Food Items</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 p-6 rounded-lg shadow-md mb-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="foodname"
            placeholder="Food Name"
            value={foodData.foodname}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={foodData.price}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            name="timing"
            placeholder="Timing"
            value={foodData.timing}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={foodData.description}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          ></textarea>

          {/* Category Select */}
          <select
            name="category"
            value={foodData.category}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>

          {/* Subcategory Select */}
          <select
            name="subcategory"
            value={foodData.subcategory}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
            disabled={!availableSubcategories.length}
          >
            <option value="">Select Subcategory</option>
            {availableSubcategories.length > 0 ? (
              availableSubcategories.map((subcat) => (
                <option key={subcat._id} value={subcat.name}>
                  {subcat.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No subcategories available
              </option>
            )}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center"
        >
          <IoAddOutline className="mr-1" />
          Add Food Item
        </button>
      </form>

      {/* Food Items List */}
      <h2 className="text-xl font-semibold mb-4">Food Items List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Food Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Timing</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Subcategory</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.foodname}
                </td>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.description}
                </td>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.price}
                </td>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.timing}
                </td>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.category}
                </td>
                <td className="px-4 py-2 border-t-2 border-r-2">
                  {item.subcategory}
                </td>
                <td className="px-4 py-2 flex items-center space-x-2 border-r-2 border-t-2">
                  <button
                    onClick={() =>
                      openImageModal(
                        `${import.meta.env.VITE_API}${item.foodphoto}`
                      )
                    }
                  >
                    <FaEye className="text-orange-400" />
                  </button>
                  {selectedImage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-4 rounded-lg shadow-lg">
                        <img
                          src={selectedImage}
                          alt="Food Item"
                          className="w-full h-64 object-cover rounded-md"
                        />
                        <button
                          onClick={closeImageModal}
                          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => openEditModal(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fooditems;

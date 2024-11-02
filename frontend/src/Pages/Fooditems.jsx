import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

function Fooditems() {
  const [foodItems, setFoodItems] = useState([]);
  const [categories, setCategories] = useState([]);
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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/category`);
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
      console.log("Selected category:", selectedCategory);

      if (selectedCategory) {
        // Create an array with the single subcategory value
        const subcats = selectedCategory.subcategory
          ? [selectedCategory.subcategory]
          : [];
        console.log("Available subcategories:", subcats);
        setAvailableSubcategories(subcats);
        setFoodData((prev) => ({ ...prev, subcategory: "" }));
      }
    }
  }, [foodData.category, categories]);

  // Fetch food items for the admin
  const fetchFoodItems = async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/food/fooditems/${userId}`
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFoodPhoto(e.target.files[0]);
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
        `${import.meta.env.VITE_API}/food/add-fooditem/${userId}`,
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
          >
            <option value="">Select Subcategory</option>
            {availableSubcategories.length > 0 ? (
              availableSubcategories.map((subcat, index) => (
                <option key={index} value={subcat}>
                  {subcat}
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
              <th className="px-4 py-2 text-left">Session</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Subcategory</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2 border-r">{item.foodname}</td>
                <td className="px-4 py-2 border-r w-80">{item.description}</td>
                <td className="px-4 py-2 border-r">₹{item.price}</td>
                <td className="px-4 py-2 border-r">{item.timing}</td>
                <td className="px-4 py-2 border-r">{item.category}</td>
                <td className="px-4 py-2 border-r">{item.subcategory}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() =>
                      openImageModal(
                        `${import.meta.env.VITE_API}/${item.foodphoto}`
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
                  <button onClick={() => openEditModal(item)}>
                    <FaEdit className="text-blue-500" />
                  </button>
                  <button onClick={() => onDelete(item._id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
            {/* Edit Modal */}{" "}
            {isEditModalOpen && editItem && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-semibold mb-4">Edit Food Item</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Food Name
                      </label>
                      <input
                        type="text"
                        value={editItem.foodname}
                        onChange={(e) =>
                          setEditItem({ ...editItem, foodname: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={editItem.description}
                        onChange={(e) =>
                          setEditItem({
                            ...editItem,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editItem.price}
                        onChange={(e) =>
                          setEditItem({ ...editItem, price: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Session
                      </label>
                      <input
                        type="text"
                        value={editItem.timing}
                        onChange={(e) =>
                          setEditItem({ ...editItem, timing: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editItem.category}
                        onChange={(e) =>
                          setEditItem({ ...editItem, timing: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Subcategory
                      </label>
                      <input
                        type="text"
                        value={editItem.subcategory}
                        onChange={(e) =>
                          setEditItem({ ...editItem, timing: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={closeEditModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fooditems;

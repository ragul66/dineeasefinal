import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CategoryUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategoryName] = useState("");
  const [subcategory, setSubcategoryName] = useState("");
  const [categoryphoto, setCategoryImage] = useState(null);
  const [subcategoryphoto, setSubcategoryImage] = useState(null);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setSelectedCategory(null);
    setCategoryName("");
    setSubcategoryName("");
    setCategoryImage(null);
    setSubcategoryImage(null);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/category`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    if (categoryphoto) formData.append("categoryphoto", categoryphoto);
    if (subcategoryphoto) formData.append("subcategoryphoto", subcategoryphoto);

    try {
      const url = selectedCategory
        ? `${import.meta.env.VITE_API}/category/${selectedCategory._id}`
        : `${import.meta.env.VITE_API}/category/categoryupload`;

      const response = await fetch(url, {
        method: selectedCategory ? "PUT" : "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Category saved successfully!");
        fetchCategories();
        closeModal();
      } else {
        setMessage("Failed to save. Please try again.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.category);
    setSubcategoryName(category.subcategory);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `${import.meta.env.VITE_API}/category/deletecategory/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMessage("Category deleted successfully!");
        fetchCategories();
      } else {
        setMessage("Failed to delete. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen bg-gray-100 p-4 font-primary">
        <button
          onClick={openModal}
          className="mb-4 px-4 py-2 bg-orange-400 text-white rounded-md shadow-md hover:bg-blue-600 transition self-end"
        >
          Add Category
        </button>

        {message && <p className="text-center text-green-500">{message}</p>}

        <div className="w-full ">
          <table className="w-full border rounded-lg overflow-hidden shadow-lg bg-white">
            <thead>
              <tr className="bg-gray-300 text-black">
                <th className="p-2">Category Name</th>
                <th className="p-2">Category Image</th>
                <th className="p-2">Subcategory Name</th>
                <th className="p-2">Subcategory Image</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="text-center border-t">
                  {/* {console.log(category._id)} */}
                  <td className="p-2">{category.category}</td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API}/${
                            category.categoryphoto
                          }`
                        )
                      }
                    >
                      <FaEye className="text-orange-400" />
                    </button>
                  </td>
                  <td className="p-2">{category.subcategory}</td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API}/${
                            category.subcategoryphoto
                          }`
                        )
                      }
                    >
                      <FaEye className="text-orange-400" />
                    </button>
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <button onClick={() => handleEdit(category)}>
                      <FaEdit className="text-green-500" />
                    </button>
                    <button onClick={() => handleDelete(category._id)}>
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {selectedCategory
                  ? "Edit Category"
                  : "Upload Category & Subcategory"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setCategoryImage)}
                    className="w-full text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subcategory Name
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subcategory Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setSubcategoryImage)}
                    className="w-full text-gray-700"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    {selectedCategory ? "Update" : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryUpload;

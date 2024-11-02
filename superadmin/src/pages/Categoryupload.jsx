import React, { useState } from "react";

const CategoryUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const [subcategories, setSubcategories] = useState([
    { name: "", photo: null },
  ]);

  // Toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Add a new subcategory
  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: "", photo: null }]);
  };

  // Remove a subcategory
  const removeSubcategory = (index) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories.splice(index, 1);
    setSubcategories(updatedSubcategories);
  };

  // Handle changes in subcategory fields
  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index][field] = value;
    setSubcategories(updatedSubcategories);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    if (categoryPhoto) formData.append("categoryphoto", categoryPhoto);

    // Append subcategories data as JSON and their photos
    formData.append(
      "subcategories",
      JSON.stringify(subcategories.map((sub) => ({ name: sub.name })))
    );
    subcategories.forEach((sub, index) => {
      if (sub.photo) formData.append(`subcategoryphoto`, sub.photo);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/category/categoryupload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Category uploaded successfully!");
        // Close modal and clear form after successful upload
        toggleModal();
        setCategory("");
        setCategoryPhoto(null);
        setSubcategories([{ name: "", photo: null }]);
      } else {
        alert("Error uploading category");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4 mr-12">
        <button
          onClick={toggleModal}
          className="px-4 py-2 bg-orange-400 text-white rounded mt-12 "
        >
          Add Category
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Add New Category
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium">Category Name</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mt-1 w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Category Photo</label>
                  <input
                    type="file"
                    onChange={(e) => setCategoryPhoto(e.target.files[0])}
                    className="mt-1 w-full px-3 py-2 border rounded"
                  />
                </div>

                <h3 className="font-medium mt-4">Subcategories</h3>
                {subcategories.map((sub, index) => (
                  <div key={index} className="border p-3 rounded mb-2">
                    <div>
                      <label className="block font-medium">
                        Subcategory Name
                      </label>
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) =>
                          handleSubcategoryChange(index, "name", e.target.value)
                        }
                        required
                        className="mt-1 w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block font-medium">
                        Subcategory Photo
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleSubcategoryChange(
                            index,
                            "photo",
                            e.target.files[0]
                          )
                        }
                        className="mt-1 w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSubcategory(index)}
                      className="mt-2 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubcategory}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Subcategory
                </button>
                <button
                  type="submit"
                  className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryUpload;

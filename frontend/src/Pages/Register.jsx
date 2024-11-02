import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phonenumber: "",
    emailid: "",
    address: "",
    ownerphoto: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input for owner photo
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ownerphoto: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("password", formData.password);
    data.append("phonenumber", formData.phonenumber);
    data.append("emailid", formData.emailid);
    data.append("address", formData.address);
    data.append("ownerphoto", formData.ownerphoto);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/admin/admininfo`,
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess("Admin info added successfully!");
        navigate("/login");
        // console.log(result);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register admin info.");
      }
    } catch (err) {
      console.error("Error while posting:", err);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg shadow-black rounded-lg p-6 mt-2 font-primary">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Registeration Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter the password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Enter the Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email ID
          </label>
          <input
            type="email"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            placeholder="Enter the EmailID"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter the Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Owner Photo
          </label>
          <input
            type="file"
            name="ownerphoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            className="w-fit bg-orange-400 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-600 focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          {/* <p
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already a User?
          </p> */}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-600 focus:ring-4 focus:ring-orange-600 focus:ring-opacity-50 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default Register;

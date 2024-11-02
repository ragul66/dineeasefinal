import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before validation

    if (!emailid) {
      setError("Please enter a valid email ID.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId); // Store userId
        // console.log(data.userId);
        navigate("/home"); // Redirect to the home page
        setMessage("Login successful!");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-primary">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email ID
            </label>
            <input
              type="text"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded-lg hover:bg-white hover:text-orange-400 transition-all duration-200"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-green-500 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_API}/admin/admininfo/${adminId}`
//     );
//     const data = await response.json();
//     console.log(data);
//     setadmins(data);
//   } catch (error) {
//     setError("failed to fetch the data");
//   }

//   try {
//     // Fetch user data from the backend by user ID
//     const res = await fetch(
//       `${import.meta.env.VITE_API}/admin/admininfo?email=${emailid}`
//     );
//     const data = await res.json();

//     if (res.ok) {
//       // Check if the password entered matches the one from the backend
//       if (data.password === password && data.status == "approved") {
//         navigate("/home"); // If password matches, navigate to home
//       } else {
//         setError("Invalid password . Please try again.");
//       }
//     } else {
//       setError(data.message || "User not found");
//     }
//   } catch (err) {
//     setError("An error occurred while trying to log in.");
//     console.error(err);
//   }

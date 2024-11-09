import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailid: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store clientId in localStorage and navigate to the home page
        localStorage.setItem("clientId", data.clientId);
        navigate("/home");
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-2 font-primary"
      style={{
        backgroundImage: "url('../src/assets/Admin Back1.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Welcome to <span className="text-orange-500">DineNow!!</span>
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

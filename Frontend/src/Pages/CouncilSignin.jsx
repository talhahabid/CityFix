import React, { useState } from "react";
import { useSignIn } from "../hooks/useSignIn"; // Assuming useSignIn is the same for council
import { Link } from "react-router-dom";

function CouncilSignin() {
  const { signin, loading, error } = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    employeeId: "", // New field for employee ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, employeeId } = formData;

    try {
      await signin(email, password, employeeId); // Make sure signin can handle employeeId
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Council Login</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium mb-1">
            Employee ID
          </label>
          <input
            id="employeeId"
            type="text"
            name="employeeId"
            placeholder="Enter your Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-center text-red-400 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}

export default CouncilSignin;

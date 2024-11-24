import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      const userData = response.data;
      login(userData);
      navigate("/allbooks");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-paleRose-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-darkRose">
          Welcome Back
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-darkRose focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-darkRose focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-darkRose text-white py-3 rounded-lg hover:bg-purplle transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-darkRose hover:text-purplle">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

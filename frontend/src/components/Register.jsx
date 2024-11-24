import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
        username,
        password,
        role: "user",
      });

      navigate("/login");
    } catch (error) {
      console.error(error); 
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-paleRose-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-darkRose">
          Create an Account
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-start">
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-darkRose focus:outline-none "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6 text-start">
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
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-darkRose hover:text-purplle">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useUser } from "./UserContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useUser();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details. Please try again later.");
      });
  }, [id]);

  const handleLogout = () => {
    logout();
    navigate("/allbooks");
  };

  if (error) return <div className="error">{error}</div>;
  if (!book) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 h-full lg:h-screen md:h-screen">
      <Navbar handleLogout={handleLogout} />
      <div className="bg-paleRose-50 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {book.coverImage && (
            <div className="md:w-1/3   rounded-lg">
              <img
                src={`${API_BASE_URL}/${book.coverImage}`}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg border-2 border-white"
              />
            </div>
          )}

          <div className="md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {book.title}
              </h1>
              <p className="text-lg text-white mb-4">
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-lg text-white mb-4">
                <span className="font-semibold">Genre:</span> {book.genre}
              </p>
              <div className="w-full mb-8 border font-semibold border-gray-200 rounded-lg p-4 bg-paleRose-50 h-auto">
                <p className="text-white text-start break-words">
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;

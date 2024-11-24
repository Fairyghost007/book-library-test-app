import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Book from "./Book";
import Navbar from "./Navbar";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const FavoriteBooksPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        if (user) {
          const userId = user.userInfo.id;
          const token = localStorage.getItem("user")?.token;

          const response = await axios.get(
            `${API_BASE_URL}/api/users/${userId}/favorites`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFavoriteBooks(response.data);
        }
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    fetchFavoriteBooks();
  }, [user]);

  const toggleFavorite = async (bookId) => {
    if (!user) {
      alert("You must be logged in to remove a book from favorites.");
      return;
    }

    try {
      const userId = user.userInfo.id;
      const token = localStorage.getItem("user")?.token;

      await axios.post(
        `${API_BASE_URL}/api/users/${userId}/favorites`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFavoriteBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.error(
        "Failed to toggle favorite:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to toggle favorite");
    }
  };

  const totalPages = Math.ceil(favoriteBooks.length / itemsPerPage);
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = favoriteBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReturnToAllBooks = () => {
    navigate("/allbooks");
  };

  const handleLogout = () => {
    logout();
    navigate("/allbooks");
  };

  return (
    <div
      className={`container mx-auto p-6  ${
        currentBooks.length <= 3
          ? " h-screen md:h-screen lg:h-screen"
          : "h-full lg:h-full md:h-full"
      }`}
    >
      <Navbar
        onReturnToAllBooks={handleReturnToAllBooks}
        handleLogout={handleLogout}
      />
      <main>
        {/* <div className=" bg-green-500 p-4 rounded-lg text-white">${favoriteBooks.length} ${totalPages} ${currentBooks.length}</div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <Book
                key={book._id}
                book={book}
                isFavorite={true}
                onFavoriteToggle={() => toggleFavorite(book._id)}
                userRole={user?.userInfo?.role}
                userId={user?.userInfo?.id}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <p className="text-xl text-gray-600">No favorite books found</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-darkRose text-white hover:bg-purplle"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-purplle text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-darkRose text-white hover:bg-purplle"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoriteBooksPage;

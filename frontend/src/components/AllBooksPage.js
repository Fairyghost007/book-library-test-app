import React, { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import AddBook from "./AddBook";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AllBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user, logout, login } = useUser();
  const navigate = useNavigate();

  const booksPerPage = 6; 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await axios.get(`${API_BASE_URL}/api/books`);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem("user")?.token;
        if (token) {
          const userId = user.userInfo.id;
          const favoritesResponse = await axios.get(
            `${API_BASE_URL}/api/users/${userId}/favorites`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFavorites(favoritesResponse.data.map((book) => book._id.toString()));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const initializeUser = () => {
      if (!user) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) login(storedUser);
      }
    };

    initializeUser();
    fetchBooks();
    fetchFavorites();
    setLoading(false);
  }, [user, login]);

  const toggleFavorite = async (bookId) => {
    if (!user) {
      alert("You must be logged in to favorite a book.");
      return;
    }

    try {
      const userId = user.userInfo.id;
      const response = await axios.post(
        `${API_BASE_URL}/api/users/${userId}/favorites`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const updatedFavorites = response.data.favoriteBooks;
      setFavorites(updatedFavorites);

      const updatedUser = {
        ...user,
        userInfo: {
          ...user.userInfo,
          favorites: updatedFavorites,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to toggle favorite:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to toggle favorite");
    }
  };

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  const handleEditBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/allbooks");
  };

  if (loading) return <p>Loading...</p>;

  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={`container mx-auto p-6  ${currentBooks.length<=3 ? "h-screen lg:h-screen md:h-screen" : "h-full lg:h-full md:h-full"}`}>

      <Navbar handleLogout={handleLogout} setShowModal={setShowModal} />
      <main>
        {/* <div className=" bg-green-500 p-4 rounded-lg text-white">${books.length} ${totalPages} ${currentBooks.length}</div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBooks.map((book) => (
            <Book
              key={book._id}
              book={book}
              isFavorite={favorites.includes(book._id.toString())}
              onFavoriteToggle={toggleFavorite}
              userRole={user?.userInfo?.role}
              userId={user?.userInfo?.id}
              onDelete={handleDeleteBook}
              onEdit={handleEditBook}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-md mr-4 disabled:bg-gray-300 hover:bg-gray-500 transition duration-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            <div className="flex items-center">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-darkRose text-white' : 'bg-gray-200 text-black hover:bg-darkRose hover:text-white'} transition duration-300`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-md ml-4 disabled:bg-gray-300 hover:bg-gray-500 transition duration-300"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <AddBook
          onAddBook={handleAddBook}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AllBooksPage;

import React, { useState, useEffect } from "react";
import EditBook from "./EditBook";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Book = ({
  book,
  onFavoriteToggle,
  userRole,
  userId,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userId) {
      fetch(`${API_BASE_URL}/api/users/${userId}/favorites`)
        .then((response) => response.json())
        .then((data) => {
          const favoriteBookIds = data.map((favBook) => favBook._id);
          setIsFavorite(favoriteBookIds.includes(book._id));
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
        });
    }
  }, [book._id, userId]);

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(bookId);
      } else {
        alert("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred while deleting the book");
    }
  };

  const handleEditBook = async (bookId, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedBook = await response.json();
        onEdit(updatedBook);
        setIsEditing(false);
      } else {
        alert("Failed to update the book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book");
    }
  };

  const toggleFavorite = async () => {
    if (userId) {
      try {
        await onFavoriteToggle(book._id);
        setIsFavorite((prev) => !prev);
      } catch (error) {
        console.error("Error toggling favorite:", error);
        alert("An error occurred while toggling favorite");
      }
    }
  };

  return (
    <div className="p-4  rounded-lg shadow-md bg-lightPurple border border-gray-200 transition-all hover:shadow-xl">
      {isEditing ? (
        <EditBook
          book={book}
          onEditBook={handleEditBook}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <Link
            to={`/detail/${book._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            <img
              src={`${API_BASE_URL}/${book.coverImage}`}
              alt={book.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </Link>
          <h3 className="text-xl font-semibold text-white">{book.title}</h3>
          <p className="text-white font-extralight">{book.author}</p>

          <div className="flex justify-between items-center  mt-4">
            {userRole === "user" && (
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2  w-full rounded-md transition-all duration-300 transform ${
                  isFavorite
                    ? "bg-darkRose text-white hover:bg-red-600"
                    : "bg-purplle text-white hover:bg-gray-400"
                }`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}

            {userRole === "admin" && (
              <div className="flex  w-full gap-5">
                <button
                  className="bg-purplle w-1/2 text-white px-4 py-2 rounded-md hover:bg-darkPurple transition duration-300"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="bg-darkRose w-1/2 text-white px-4 py-2 rounded-md hover:bg-purplle transition duration-300"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Book;

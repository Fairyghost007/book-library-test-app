import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ onClose, onAddBook }) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    coverImage: null,
  });

  const handleAddBook = async () => {
    const formData = new FormData();
    Object.entries(newBook).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/books`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onAddBook(response.data); 
      onClose(); 
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-lightPurple p-6 rounded-lg shadow-lg w-96 max-w-md text-white transform scale-95 hover:scale-100 transition-transform duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6 animate-slideInUp">Add New Book</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkRose transition duration-300"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkRose transition duration-300"
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkRose transition duration-300"
          />
          <textarea
            placeholder="Description"
            value={newBook.description}
            onChange={(e) =>
              setNewBook({ ...newBook, description: e.target.value })
            }
            className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkRose transition duration-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewBook({ ...newBook, coverImage: e.target.files[0] })
            }
            className="w-full p-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkRose transition duration-300"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-darkRose text-white px-6 py-2 rounded-lg hover:bg-purplle transition duration-300 transform hover:scale-105"
            onClick={handleAddBook}
          >
            Add Book
          </button>
          <button
            className="bg-palePurple text-white px-6 py-2 rounded-lg hover:bg-darkRose transition duration-300 transform hover:scale-105"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

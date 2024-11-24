import React, { useState } from "react";

const EditBook = ({ book, onEditBook, setIsEditing }) => {
  const [editedBook, setEditedBook] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    coverImage: null, 
  });

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", editedBook.title);
    formData.append("author", editedBook.author);
    formData.append("genre", editedBook.genre);
    formData.append("description", editedBook.description);

    if (editedBook.coverImage) {
      formData.append("coverImage", editedBook.coverImage);
    }

    onEditBook(book._id, formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-paleRose-90 p-4 rounded shadow-lg w-auto border border-white h-auto">
      <input
        type="text"
        value={editedBook.title}
        onChange={(e) =>
          setEditedBook({ ...editedBook, title: e.target.value })
        }
        className="w-full border p-2 rounded-lg mb-2 bg-lightPurple border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRose text-white"
      />
      <input
        type="text"
        value={editedBook.author}
        onChange={(e) =>
          setEditedBook({ ...editedBook, author: e.target.value })
        }
        className="w-full border p-2 rounded-lg mb-2 bg-lightPurple border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRose text-white"
      />
      <input
        type="text"
        value={editedBook.genre}
        onChange={(e) =>
          setEditedBook({ ...editedBook, genre: e.target.value })
        }
        className="w-full border p-2 rounded-lg mb-2 bg-lightPurple border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRose text-white"
      />
      <textarea
        value={editedBook.description}
        onChange={(e) =>
          setEditedBook({ ...editedBook, description: e.target.value })
        }
        className="w-full h-24 border p-2 rounded-lg mb-2 bg-lightPurple border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRose text-white"
      />
      <input
  type="file"
  onChange={(e) =>
    setEditedBook({ ...editedBook, coverImage: e.target.files[0] })
  }
  className="w-full border p-2 rounded-lg mb-2 bg-lightPurple border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRose text-white"
/>

      <div className="flex justify-between gap-4">
        <button
          className="bg-darkRose text-white w-1/2 px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-purplle text-white w-1/2 px-4 py-2 rounded"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBook;

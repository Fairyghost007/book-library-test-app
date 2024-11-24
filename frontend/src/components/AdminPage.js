import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverImage: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/books').then((response) => {
      setBooks(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', form).then(() => {
      setBooks((prev) => [...prev, form]);
      setForm({ title: '', author: '', genre: '', description: '', coverImage: '' });
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>
      <h2 className="text-xl font-semibold">Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id} className="mb-2">
            {book.title}{' '}
            <button
              className="text-red-500"
              onClick={() =>
                axios.delete(`http://localhost:5000/api/books/${book._id}`).then(() => {
                  setBooks((prev) => prev.filter((b) => b._id !== book._id));
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;

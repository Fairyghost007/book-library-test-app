const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  coverImage: { type: String, default: 'uploads/default.jpg' }, // Set default image
});


module.exports = mongoose.model('Book', BookSchema);

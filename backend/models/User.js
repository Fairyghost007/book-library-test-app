const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user' 
  },
  favoriteBooks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    required: function() { return this.role === 'user'; }, 
    default: []
  },
});

module.exports = mongoose.model('User', UserSchema);

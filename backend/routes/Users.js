const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const isFavorite = user.favoriteBooks.some(id => id.toString() === bookId);

    if (isFavorite) {
      user.favoriteBooks = user.favoriteBooks.filter(id => id.toString() !== bookId);
      await user.save();
      return res.status(200).json({
        message: 'Book removed from favorites',
        favoriteBooks: user.favoriteBooks.map(id => id.toString()),
      });
    }

    user.favoriteBooks.push(bookId);
    await user.save();

    res.status(200).json({
      message: 'Book added to favorites',
      favoriteBooks: user.favoriteBooks.map(id => id.toString()),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favoriteBooks');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.favoriteBooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const index = user.favoriteBooks.indexOf(bookId);
    if (index === -1) {
      return res.status(400).json({ message: 'Book is not in favorites' });
    }

    user.favoriteBooks.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Book removed from favorites', favoriteBooks: user.favoriteBooks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


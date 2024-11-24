const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const userExists = await User.findOne({ username });
  
      if (userExists) {
        return res.status(400).json({ message: 'Username already taken, please choose another.' });
      }
  
      const newUser = new User({ username, password, role });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        message: 'Login successful',
        token,
        userInfo: {
          id: user._id,
          username: user.username,
          role: user.role,
          favorites: user.favoriteBooks
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;


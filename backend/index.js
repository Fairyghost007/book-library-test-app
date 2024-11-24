const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const authenticateJWT = require('./middlewares/AuthJTW');

dotenv.config();

connectDB().catch((error) => {
  process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

app.use('/api/books', require('./routes/Books'));
app.use('/api/users', require('./routes/Users'));
app.use('/auth', require('./routes/auth'));
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


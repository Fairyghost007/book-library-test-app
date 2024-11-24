
# Book Library App

A full-stack web application for managing a book library. Built with the **MERN stack** and styled using **Tailwind CSS**.

## Features

### Admin Features:
- **Add** new books to the library.
- **Edit** book details.
- **Remove** books from the library.
- **View** detailed information about any book.

### User Features:
- **View** detailed information about any book.
- **Add** books to their **favorites** list.
- **Remove** books from their **favorites** list.

### Authentication:
- **JWT** (JSON Web Tokens) used for secure user authentication.
- Separate roles for **Admin** and **User**.

## Technologies Used

### Frontend:
- **React.js**
- **Tailwind CSS**

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**

### Deployment:
- Backend and Frontend deployed on **Render**: [Book Library App](https://book-library-test-app.onrender.com)

## Models

### Book Model
```javascript
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  coverImage: { type: String, default: 'uploads/default.jpg' }, // Default cover image
});

module.exports = mongoose.model('Book', BookSchema);
```

### User Model
```javascript
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
```

## Setup and Installation

### Prerequisites:
- **Node.js** and **npm** installed.
- **MongoDB** server running locally or on a cloud provider like **MongoDB Atlas**.

### Backend Setup:
1. Clone the repository and navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API endpoint in the environment:
   ```env
   REACT_APP_API_URL=your_backend_url
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

### Deployment:
- The application is deployed on **Render**. Access it here: [Book Library App](https://book-library-test-app.onrender.com).

## License
This project is licensed under the **MIT License**.

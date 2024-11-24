const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Book = require("../models/Book");

const uploadDir = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const coverImage = req.file ? `uploads/${req.file.filename}` : "uploads/default.jpg";
    const book = new Book({ title, author, genre, description, coverImage });
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(400).json({ message: "Failed to add book" });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
});

router.put("/:id", upload.single("coverImage"), async (req, res) => {
  try {
    const updatedBookData = req.body;
    const existingBook = await Book.findById(req.params.id);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.file) {
      if (existingBook.coverImage && existingBook.coverImage !== "uploads/default.jpg") {
        const oldImagePath = path.join(__dirname, "..", "public", existingBook.coverImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          }
        });
      }

      updatedBookData.coverImage = `uploads/${req.file.filename}`;
    } else {
      updatedBookData.coverImage = existingBook.coverImage || "uploads/default.jpg";
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updatedBookData,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ message: "Failed to update book" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.coverImage && !book.coverImage.endsWith("default.jpg")) {
      const imagePath = path.resolve(__dirname, "../public", book.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

router.use("/uploads", express.static(uploadDir));

module.exports = router;


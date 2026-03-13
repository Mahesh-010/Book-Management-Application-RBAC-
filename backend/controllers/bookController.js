const Book = require('../models/Book');

// GET /books — accessible to everyone
async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// POST /books — admin only
async function createBook(req, res) {
  try {
    const { title, author } = req.body;
    const book = await Book.create({ title, author });
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// PUT /books/:id — admin only
async function updateBook(req, res) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// DELETE /books/:id — admin only
async function deleteBook(req, res) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { getAllBooks, createBook, updateBook, deleteBook };
const express = require('express');
const router  = express.Router();

const { authenticate }   = require('../middleware/authenticate');
const { authorizeAdmin } = require('../middleware/authorize');
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');

// Anyone logged in can read
router.get('/',       authenticate,                  getAllBooks);

// Admin only
router.post('/',      authenticate, authorizeAdmin,  createBook);
router.put('/:id',    authenticate, authorizeAdmin,  updateBook);
router.delete('/:id', authenticate, authorizeAdmin,  deleteBook);

module.exports = router;
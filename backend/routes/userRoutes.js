const express = require('express');
const router  = express.Router();

const { authenticate }   = require('../middleware/authenticate');
const { authorizeAdmin } = require('../middleware/authorize');
const { makeAdmin }      = require('../controllers/userController');

// Admin only
router.put('/:userId/make-admin', authenticate, authorizeAdmin, makeAdmin);

module.exports = router;
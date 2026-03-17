const express = require('express');
const app     = express();

app.use(express.json());

// Routes
app.use('/auth',  require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/users' require('./routes/userRoutes'));

module.exports = app;

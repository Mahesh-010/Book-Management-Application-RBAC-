const User    = require('../models/User');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');

// POST /auth/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'regular_user'  // always forced — client cannot set this
    });

    res.status(201).json({ message: 'User registered successfully', userId: user._id });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// POST /auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, role: user.role, name: user.name });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { register, login };
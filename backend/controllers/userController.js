const User = require('../models/User');

// PUT /users/:userId/make-admin — admin only
async function makeAdmin(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    user.role = 'admin';
    await user.save();

    res.json({ message: `${user.name} has been promoted to admin` });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { makeAdmin };
function authorizeAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied: insufficient permissions'
    });
  }
  next();
}

module.exports = { authorizeAdmin };
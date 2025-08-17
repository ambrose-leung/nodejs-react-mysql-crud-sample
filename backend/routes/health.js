const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

module.exports = router;

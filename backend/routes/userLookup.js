const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get user by name
router.get('/users/:name', (req, res) => {
  const { name } = req.params;
  
  const query = 'SELECT * FROM users WHERE name = ?';
  
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(results[0]);
  });
});

// Get all users (for testing)
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    
    res.json(results);
  });
});

module.exports = router;

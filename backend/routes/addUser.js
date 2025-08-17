const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Add new user
router.post('/users', (req, res) => {
  const { name, email, age, city } = req.body;
  
  // Validate required fields
  if (!name || !email || !age || !city) {
    return res.status(400).json({ error: 'All fields (name, email, age, city) are required' });
  }
  
  const query = 'INSERT INTO users (name, email, age, city) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, age, city], (err, results) => {
    if (err) {
      console.error('Database insert error:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'User with this name or email already exists' });
      }
      return res.status(500).json({ error: 'Failed to add user' });
    }
    
    res.status(201).json({ 
      message: 'User added successfully', 
      id: results.insertId,
      user: { id: results.insertId, name, email, age, city }
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Delete user by name
router.delete('/users/:name', (req, res) => {
  const { name } = req.params;
  
  // First check if user exists
  const checkQuery = 'SELECT * FROM users WHERE name = ?';
  
  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // User exists, proceed with deletion
    const deleteQuery = 'DELETE FROM users WHERE name = ?';
    
    db.query(deleteQuery, [name], (err, deleteResults) => {
      if (err) {
        console.error('Database delete error:', err);
        return res.status(500).json({ error: 'Failed to delete user' });
      }
      
      res.json({ 
        message: 'User deleted successfully',
        deletedUser: results[0]
      });
    });
  });
});

module.exports = router;

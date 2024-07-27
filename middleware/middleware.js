const jwt = require('jsonwebtoken');
require('dotenv').config

const User = require('../models/models')

const JWT_SECRET = process.env.JWT_SECRET || 'f43bc390c74c2b8871de5c89e88172019c5cb46a14e740cf62a1e81c48851600';

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    try {
          
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error();
        }
  
      req.user = user; // Attach user to request object
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
  
  module.exports = authenticate;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserData');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authmiddleware');

router.get('/', (req, res) => {
    res.json({ message: "Users route working" });
});

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({name: username });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const userRole = role;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({name: username, password: hashedPassword, role: userRole });
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({name: username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN || '1d' } 
        );
       
        res.json({
            Msg: 'Login successful',
            token,
        });
    } catch (err) {
        console.error('Login error:', err.message);
        console.error(err.stack);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// ---------------- PROTECTED ROUTE ----------------
router.get('/profile', protect, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
    }
  });
});

// ---------------- to get doctors in admin ----------------
router.get('/doctors', protect, async (req, res) => {
  try {
    // Only admin allowed
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    const doctors = await User.find({ role: 'doctor' })
      .select('_id name role');

    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// ---------------- DELETE USER ----------------
router.delete("/delete/:id",protect, async (req, res) => {
  try {
     // Only admin can delete users
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


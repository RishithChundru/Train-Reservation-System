const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js"); // Ensure correct path
require("dotenv").config(); // Load environment variables

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { mobile, username, email, dob, password, security_question, security_answer } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already registered" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedAnswer = await bcrypt.hash(security_answer, salt); // Hash security answer

        const newUser = new User({
            mobile,
            username,
            email,
            dob,
            password: hashedPassword,
            security_question,
            security_answer: hashedAnswer, // Store hashed security answer
        });

        await newUser.save();
        res.status(201).json({ msg: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;

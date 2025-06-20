const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router(); // Initialize router once

// ✅ Test route to check if server and routing work
router.get("/test", (req, res) => {
  res.send("✅ Server is working and routing is set up correctly!");
});


// ✅ @route   POST /api/auth/login
// ✅ @desc    Login user with email, username, or phone
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // ✅ Flexible login lookup
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    user.password = undefined; // hide password
    res.json({ token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ✅ @route   POST /api/auth/register
// ✅ @desc    Register a new user with name, email, phone, username, etc.
router.post("/register", async (req, res) => {
  const { name, email, phone, username, password, role } = req.body;

  try {
    // ✅ Check for email or phone or username already in use
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Email, phone or username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

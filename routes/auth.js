const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient(); // 🔌 Initialize Prisma client
const router = express.Router();   // 📦 Set up the Express router

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  res.send("✅ Server is working and routing is set up correctly (using Prisma)!");
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 🔍 Find user by email OR phone OR username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
          { username: identifier },
        ],
      },
    });

    // ❌ If no user found
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 🔐 Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 🪙 Create JWT token with user id and role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🧼 Remove password before sending user object
    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { name, email, phone, username, password, role } = req.body;

  try {
    // 🔍 Check for existing user by email, phone, or username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone },
          { username },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Email, phone or username already taken" });
    }

    // 🔐 Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create user in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        username,
        password: hashedPassword,
        role: role || "user",
      },
    });

    // 🪙 Create token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🧼 Remove password before sending response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

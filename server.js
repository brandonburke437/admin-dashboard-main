require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const roleMiddleware = require("./middleware/roleMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

const app = express(); // ← Must be declared before using app.use

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/admin")); // ✅ Now it’s safe here!
app.use("/api/applications", require("./routes/applications"));

// Default route
app.get("/", (req, res) => {
  res.send("🎓 Scholarship API is running...");
});

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Welcome 👋, your user ID is: ${req.user.id}` });
});

// Admin dashboard
app.get(
  "/api/admin/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ msg: `Welcome admin 👑 ${req.user.id}` });
  }
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

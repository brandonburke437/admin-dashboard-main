const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Admin: Get all users
router.get("/admin/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Admin: Update user role
router.put("/admin/users/:id/role", authMiddleware, adminMiddleware, async (req, res) => {
  const { role } = req.body;

  if (!role || !["user", "admin"].includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
    });
    res.json({ msg: "User role updated", user });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ msg: "User not found" });
    }
    console.error("Error updating user role:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Admin: Delete a user
router.delete("/admin/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ msg: "User deleted successfully", user });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ msg: "User not found" });
    }
    console.error("Error deleting user:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//Admin: Get all scholarship applications (optionally filtered by status)
router.get("/admin/applications", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const applications = await prisma.scholarshipApplication.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
          },
        },
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// Admin: Get application stats (submitted, pending, approved, rejected, total)
router.get("/admin/application-stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const total = await prisma.scholarshipApplication.count();
    const submitted = await prisma.scholarshipApplication.count({ where: { status: "Submitted" } });
    const pending = await prisma.scholarshipApplication.count({ where: { status: "Pending" } });
    const approved = await prisma.scholarshipApplication.count({ where: { status: "Approved" } });
    const rejected = await prisma.scholarshipApplication.count({ where: { status: "Rejected" } });

    res.json({ total, submitted, pending, approved, rejected });
  } catch (error) {
    console.error("Error fetching application stats:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;

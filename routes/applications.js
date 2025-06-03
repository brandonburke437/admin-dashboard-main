const express = require("express");
const router = express.Router();
const ScholarshipApplication = require("../models/ScholarshipApplication");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// @route   POST /api/applications
// @desc    Submit a scholarship application (User only)
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const application = new ScholarshipApplication({
      ...req.body,
      user: req.user.id, // from JWT token
    });

    await application.save();
    res.status(201).json({ msg: "Application submitted", application });
  } catch (error) {
    console.error("Application submission error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all applications for the logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await ScholarshipApplication.find({ user: userId }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🧑‍💼 Admin: Get all scholarship applications
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const applications = await ScholarshipApplication.find().populate("user", "-password");
    res.json(applications);
  } catch (error) {
    console.error("Error fetching all applications:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🧑‍💼 Admin: Update application status (approve/reject)
router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;

  // ✅ 1. Validate the status input
  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status. Must be 'approved', 'rejected', or 'pending'" });
  }

  try {
    // ✅ 2. Find the application by ID and update the status
    const updatedApp = await ScholarshipApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    ).populate("user", "-password"); // Optional: show user info (excluding password)

    // ✅ 3. Handle not found
    if (!updatedApp) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // ✅ 4. Return updated application
    res.json({
      msg: `Application status updated to ${status}`,
      application: updatedApp,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   GET /api/applications/search?name=Test%20User
// @desc    Admin and user search applications by user name
// @access  Private
router.get("/search", authMiddleware, async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ msg: "Please provide a name to search" });
  }

  try {
    const allApplications = await ScholarshipApplication.find()
      .populate({
        path: "user",
        select: "name email",
        match: { name: new RegExp(name, "i") },
      });

    // Filter applications by user's own submissions if not admin
    const filtered = allApplications.filter(app => {
      if (!app.user) return false;
      if (req.user.role === "admin") return true;
      return app.user._id.toString() === req.user.id;
    });

    if (filtered.length === 0) {
      return res.status(404).json({ msg: "No applications found for that name" });
    }

    res.json(filtered);
  } catch (error) {
    console.error("❌ Error in /search route:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// Get a specific application by ID (user or admin)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await ScholarshipApplication.findById(req.params.id).populate("user", "-password");
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // If not admin, only allow user to view their own application
    if (req.user.role !== "admin" && application.user._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching application by ID:", error);
    res.status(500).json({ msg: "Server error" });
  }
});



module.exports = router;

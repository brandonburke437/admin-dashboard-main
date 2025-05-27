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


module.exports = router;

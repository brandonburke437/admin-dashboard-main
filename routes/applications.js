const express = require("express");
const router = express.Router();
const ScholarshipApplication = require("../models/ScholarshipApplication");
const authMiddleware = require("../middleware/authMiddleware");

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

module.exports = router;

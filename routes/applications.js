const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
// const ScholarshipApplication = require("../models/ScholarshipApplication");


// @route   POST /api/applications
// @desc    Submit a scholarship application (User only)
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      fullName,
      idNumber,
      applicantType,
      appliedInstitution,
      documents = [],
      nationality,
      ...otherFields
    } = req.body;

    //  Utility: Smart date converter
    const fixDateFormat = (value) => {
  if (!value) return undefined;

  // If it's already a Date object, return it directly
  if (value instanceof Date) return value;

  // If it's not a string, convert to string first
  const str = typeof value === "string" ? value : String(value);

  const normalized = str.replace(/\//g, "-");
  const parsed = new Date(normalized);

  return isNaN(parsed.getTime()) ? undefined : parsed;
};


    // 1. Disqualify certain institutions
    const disqualified = ["nursing", "teacher training", "college of education"];
    if (disqualified.some(term => appliedInstitution?.toLowerCase().includes(term))) {
      return res.status(400).json({ msg: "Disqualified institution." });
    }

    // 2. Validate applicantType + required docs
    const requiredDocsMap = {
      postgraduate: ["admission_letter", "first_degree", "cv", "recommendation_letters", "nss_certificate", "passport_picture"],
      undergraduate: ["admission_letter", "waec_results", "testimonial", "id_card", "passport_picture"],
      continuing: ["admission_letter", "transcript", "id_card", "passport_picture", "cgpa"]
    };

    if (!applicantType || !requiredDocsMap[applicantType]) {
      return res.status(400).json({ msg: "Invalid or missing applicantType." });
    }

    const missingDocs = requiredDocsMap[applicantType].filter(
      doc => !documents.some(d => d.type === doc)
    );

    if (missingDocs.length > 0) {
      return res.status(400).json({ msg: `Missing documents: ${missingDocs.join(", ")}` });
    }

    // 3. Validate Ghana Card or Passport Number
    const ghanaCardPattern = /^GHA-\d{9}-\d{1}$/;
    const passportPattern = /^[A-Z0-9]{6,20}$/;

    if (!idNumber || (!ghanaCardPattern.test(idNumber) && !passportPattern.test(idNumber))) {
      return res.status(400).json({ msg: "Invalid ID number format." });
    }

    // 4. Check for duplicate applications
    const existingApp = await prisma.scholarshipApplication.findFirst({
      where: { fullName, idNumber }
    });

    if (existingApp) {
      return res.status(400).json({ msg: "Duplicate application detected." });
    }

    //5. Safely convert and validate date fields
    // Override with converted values
  otherFields.dateOfBirth = fixDateFormat(otherFields.dateOfBirth);
  otherFields.applicationDeadline = fixDateFormat(otherFields.applicationDeadline);

    if (!otherFields.dateOfBirth) {
          return res.status(400).json({ msg: "Invalid or missing dateOfBirth. Use YYYY-MM-DD or MM/DD/YYYY." });
        }

    if (!otherFields.applicationDeadline) {
          return res.status(400).json({ msg: "Invalid or missing applicationDeadline." });
        }



    
    console.log(" Converted Dates:", {
  rawDOB: otherFields.dateOfBirth,
  convertedDOB: fixDateFormat(otherFields.dateOfBirth),
  rawDeadline: otherFields.applicationDeadline,
  convertedDeadline: fixDateFormat(otherFields.applicationDeadline),
});


    // 6. Save application
    const newApp = await prisma.scholarshipApplication.create({
  data: {
    fullName,
    idNumber,
    applicantType,
    appliedInstitution,
    nationality,
    userId: req.user.id,
    documents: {
      createMany: {
        data: documents.map(doc => ({
          type: doc.type,
          fileUrl: doc.fileUrl
        }))
      }
    },
    ...otherFields,
  },
  include: {
    documents: true,
  }
});


    res.status(201).json({ msg: "Application submitted", application: newApp });

  } catch (error) {
    console.error("Application submission error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});




// Get all applications for the logged-in user (Prisma)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await prisma.scholarshipApplication.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


//  Admin: Get all scholarship applications
// Admin: Get all scholarship applications (Prisma)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const applications = await prisma.scholarshipApplication.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            role: true,
            createdAt: true,
          },
        },
        documents: true, // Optional: include documents
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching all applications:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

//  Admin: Update application status (approve/reject)(Prisma)
router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;
const appId = req.params.id; // Leave it as string for UUID

  //  1. Validate input
  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status. Must be 'approved', 'rejected', or 'pending'" });
  }

  try {
    // 2. Check if application exists
    const existing = await prisma.scholarshipApplication.findUnique({
      where: { id: appId },
    });

    if (!existing) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // 3. Update the status
    const updated = await prisma.scholarshipApplication.update({
      where: { id: appId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            role: true,
          }
        },
        documents: true,
      }
    });

    res.json({ msg: `Application status updated to '${status}'`, application: updated });
  } catch (error) {
    console.error(" Error updating application status:", error);
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
    const applications = await prisma.scholarshipApplication.findMany({
      where: {
        user: {
          name: {
            contains: name,
            mode: "insensitive", // case-insensitive search
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            role: true,
          }
        },
        documents: true,
      }
    });

    // 🔐 If not admin, filter to only this user's applications
    const filteredApps = req.user.role === "admin"
      ? applications
      : applications.filter(app => app.user.id === req.user.id);

    if (filteredApps.length === 0) {
      return res.status(404).json({ msg: "No applications found for that name" });
    }

    res.json(filteredApps);

  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({ msg: "Server error" });
  }
});


// @route   GET /api/applications/:id
// @desc    Get one application by ID (admin or user)
// @access  Private
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const application = await prisma.scholarshipApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            role: true,
          },
        },
        documents: true,
      },
    });

    // 🔎 Not found
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // 🔐 Access control — only the owner or an admin can view it
    const isOwner = application.user.id === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ msg: "Unauthorized access" });
    }

    res.json(application);

  } catch (error) {
    console.error("Error fetching application by ID:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

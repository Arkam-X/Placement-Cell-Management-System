const express = require("express");
const router = express.Router();

const { applyForCompany, getMyApplications, getApplicantsByCompany, updateApplicationStatus } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Apply for company Student.
router.post("/", protect, authorize("STUDENT"), applyForCompany);

// View applications Student.
router.get("/my", protect, authorize("STUDENT"), getMyApplications);

// View all applicants per company TPO.
router.get("/company/:companyId", protect, authorize("TPO"), getApplicantsByCompany);

// Update application status by TPO.
router.put("/:applicationId/status", protect, authorize("TPO"), updateApplicationStatus);

module.exports = router;
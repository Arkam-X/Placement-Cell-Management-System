const express = require("express");
const router = express.Router();

const { applyForCompany, getMyApplications, getApplicantsByCompany, updateApplicationStatus } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { ROLES } = require("../utils/constants");

// Apply for company Student.
router.post("/", protect, authorize(ROLES.STUDENT), applyForCompany);

// View applications Student.
router.get("/my", protect, authorize(ROLES.STUDENT), getMyApplications);

// View all applicants per company TPO.
router.get("/company/:companyId", protect, authorize(ROLES.TPO), getApplicantsByCompany);

// Update application status by TPO.
router.put("/:applicationId/status", protect, authorize(ROLES.TPO), updateApplicationStatus);

module.exports = router;
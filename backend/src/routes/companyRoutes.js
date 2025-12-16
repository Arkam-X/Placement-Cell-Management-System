const express = require("express");
const router = express.Router();

const { addCompany, getCompanies } = require("../controllers/companyController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { ROLES } = require("../utils/constants");

// Get companies (Student + TPO).
router.get("/", protect, getCompanies);

// Add company (TPO only).
router.post("/", protect, authorize(ROLES.TPO), addCompany);

module.exports = router;
const express = require("express");
const router = express.Router();

const { addCompany, getCompanies } = require("../controllers/companyController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Get companies (Student + TPO).
router.get("/", protect, getCompanies);

// Add company (TPO only).
router.post("/", protect, authorize("TPO"), addCompany);

module.exports = router;
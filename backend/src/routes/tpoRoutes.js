const express = require("express");
const router = express.Router();

const { getAllStudentsWithApplications } = require("../controllers/tpoController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/students", protect, authorize("TPO"), getAllStudentsWithApplications);

module.exports = router;


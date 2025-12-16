const express = require("express");
const router = express.Router();

const { applyForCompany } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("STUDENT"), applyForCompany);

module.exports = router;
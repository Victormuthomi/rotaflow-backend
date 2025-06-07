const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employer.controller");
const { validateEmployer } = require("../middleware/validation.middleware");

// Employer registration
router.post("/register", validateEmployer, employerController.registerEmployer);

// Get all employers
router.get("/", employerController.getAllEmployers);

module.exports = router;

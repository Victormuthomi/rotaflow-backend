const express = require("express");
const router = express.Router();

const employerRoutes = require("./employerRoutes");
const employeeRoutes = require("./employeeRoutes");
const roleRoutes = require("./roleRoutes");

// Employers routes
router.use("/employers", employerRoutes);

// Employees routes nested under employerId param
router.use("/employers/:employerId/employees", employeeRoutes);

// Roles routes nested under employerId param
router.use("/employers/:employerId/roles", roleRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();

const employerRoutes = require("./employerRoutes");
const employeeRoutes = require("./employeeRoutes");
const roleRoutes = require("./roleRoutes");
const scheduleRoutes = require("./scheduleRoutes");

// Employers routes
router.use("/employers", employerRoutes);

// Employees routes nested under employerId param
router.use("/employers/:employerId/employees", employeeRoutes);

// Roles routes nested under employerId param
router.use("/employers/:employerId/roles", roleRoutes);

//schedu routes
router.use("/employers", scheduleRoutes);

module.exports = router;

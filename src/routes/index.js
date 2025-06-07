const express = require("express");
const router = express.Router();

router.use("/employers", require("./employerRoutes"));
router.use("/employees", require("./employeeRoutes"));
router.use("/departments", require("./departmentRoutes"));
router.use("/organizations", require("./organizationRoutes"));

module.exports = router;

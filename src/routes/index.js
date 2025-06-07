const express = require("express");
const router = express.Router();

const employerRoutes = require("./employerRoutes");

router.use("/employers", employerRoutes);

module.exports = router;

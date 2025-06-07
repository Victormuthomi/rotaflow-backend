const express = require("express");
const router = express.Router();

const employerRoutes = require("./employerRoutes");
// TODO: add other route files here

router.use("/employers", employerRoutes);

module.exports = router;

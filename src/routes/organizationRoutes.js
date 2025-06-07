const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization.controller");

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Register a new organization
 *     tags: [Organizations]
 */
router.post("/", organizationController.createOrganization);

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 */
router.get("/", organizationController.getAllOrganizations);

module.exports = router;

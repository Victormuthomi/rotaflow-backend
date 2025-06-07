const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Create a new organization
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

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
 */
router.get("/:id", organizationController.getOrganizationById);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     summary: Update organization by ID
 *     tags: [Organizations]
 */
router.put("/:id", organizationController.updateOrganization);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     summary: Delete organization by ID
 *     tags: [Organizations]
 */
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;

const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");

/**
 * @swagger
 * /api/employers:
 *   post:
 *     summary: Register a new employer (create employer account)
 *     tags: [Employers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - nationalId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Acme Corp"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               nationalId:
 *                 type: string
 *                 example: "12345678"
 *               email:
 *                 type: string
 *                 example: "contact@acmecorp.com"
 */
router.post("/", employerController.createEmployer);

/**
 * @swagger
 * /api/employers:
 *   get:
 *     summary: Get all registered employers
 *     tags: [Employers]
 */
router.get("/", employerController.getAllEmployers);

/**
 * @swagger
 * /api/employers/{id}:
 *   get:
 *     summary: Get employer details by ID
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employer ID
 *         schema:
 *           type: string
 */
router.get("/:id", employerController.getEmployerById);

/**
 * @swagger
 * /api/employers/{id}:
 *   put:
 *     summary: Update employer details by ID
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employer ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               nationalId:
 *                 type: string
 *               email:
 *                 type: string
 */
router.put("/:id", employerController.updateEmployer);

/**
 * @swagger
 * /api/employers/{id}:
 *   delete:
 *     summary: Delete employer account by ID
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employer ID
 *         schema:
 *           type: string
 */
router.delete("/:id", employerController.deleteEmployer);

module.exports = router;

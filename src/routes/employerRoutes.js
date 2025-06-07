const express = require("express");
const router = express.Router();
const employerController = require("../controllers/employerController");

/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: Employer management
 */

/**
 * @swagger
 * /api/employers:
 *   post:
 *     summary: Register a new employer
 *     tags: [Employers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nationalId
 *               - phoneNumber
 *               - organizationName
 *               - departmentName
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               nationalId:
 *                 type: string
 *                 example: "123456789"
 *               phoneNumber:
 *                 type: string
 *                 example: "+254712345678"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               organizationName:
 *                 type: string
 *                 example: "Acme Ltd"
 *               departmentName:
 *                 type: string
 *                 example: "IT Department"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *     responses:
 *       201:
 *         description: Employer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 employerId:
 *                   type: string
 *       400:
 *         description: Bad request - missing required fields
 *       409:
 *         description: Employer already exists
 */
router.post("/register", employerController.createEmployer);

/**
 * @swagger
 * /api/employers/login:
 *   post:
 *     summary: Employer login
 *     tags: [Employers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nationalId
 *               - password
 *             properties:
 *               nationalId:
 *                 type: string
 *                 example: "123456789"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", employerController.loginEmployer);

/**
 * @swagger
 * /api/employers:
 *   get:
 *     summary: Get all employers
 *     tags: [Employers]
 *     responses:
 *       200:
 *         description: List of employers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   nationalId:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   email:
 *                     type: string
 *                   organizationName:
 *                     type: string
 *                   departmentName:
 *                     type: string
 */
router.get("/", employerController.getAllEmployers);

/**
 * @swagger
 * /api/employers/{id}:
 *   get:
 *     summary: Get employer by ID
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: Employer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 nationalId:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *                 organizationName:
 *                   type: string
 *                 departmentName:
 *                   type: string
 *       404:
 *         description: Employer not found
 */
router.get("/:id", employerController.getEmployerById);

/**
 * @swagger
 * /api/employers/{id}:
 *   put:
 *     summary: Update employer
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
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
 *               email:
 *                 type: string
 *               organizationName:
 *                 type: string
 *               departmentName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Employer not found
 */
router.put("/:id", employerController.updateEmployer);

/**
 * @swagger
 * /api/employers/{id}:
 *   delete:
 *     summary: Delete employer
 *     tags: [Employers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: Employer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Employer not found
 */
router.delete("/:id", employerController.deleteEmployer);

module.exports = router;

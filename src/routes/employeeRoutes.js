const express = require("express");
const router = express.Router({ mergeParams: true });
const employeeController = require("../controllers/employeeController");

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management under an employer
 */

/**
 * @swagger
 * /api/employers/{employerId}/employees:
 *   post:
 *     summary: Create a new employee under an employer
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
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
 *             required:
 *               - name
 *               - nationalId
 *               - phoneNumber
 *             properties:
 *               name:
 *                 type: string
 *               nationalId:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /api/employers/{employerId}/employees:
 *   get:
 *     summary: Get all employees under an employer
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: List of employees
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
 *       404:
 *         description: Employer not found
 *       500:
 *         description: Server error
 */
router.get("/", employeeController.getEmployees);

/**
 * @swagger
 * /api/employers/{employerId}/employees/{id}:
 *   get:
 *     summary: Get a single employee under an employer
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
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
 *                 role:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Employer or Employee not found
 *       500:
 *         description: Server error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employers/{employerId}/employees/{id}:
 *   put:
 *     summary: Update an employee's details
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               nationalId:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employer or Employee not found
 *       500:
 *         description: Server error
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employers/{employerId}/employees/{id}:
 *   delete:
 *     summary: Delete an employee under an employer
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employer ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employer or Employee not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;

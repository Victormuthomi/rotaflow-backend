const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

/**
 * @swagger
 * /api/employees/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post("/register", employeeController.registerEmployee);

/**
 * @swagger
 * /api/employees/employer/{employerId}:
 *   get:
 *     summary: Get all employees for a specific employer
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/employer/:employerId", employeeController.getEmployeesByEmployer);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get single employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee data
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 */
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;

const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

/**
 * @swagger
 * /api/employees/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Employees]
 */
router.post("/register", employeeController.registerEmployee);

/**
 * @swagger
 * /api/employees/employer/{employerId}:
 *   get:
 *     summary: Get all employees for a specific employer
 *     tags: [Employees]
 */
router.get("/employer/:employerId", employeeController.getEmployeesByEmployer);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get single employee by ID
 *     tags: [Employees]
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 */
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;

const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 */
router.post("/", departmentController.createDepartment);

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 */
router.get("/", departmentController.getAllDepartments);

module.exports = router;

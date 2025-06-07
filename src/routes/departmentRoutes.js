const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

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

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 */
router.get("/:id", departmentController.getDepartmentById);

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update department by ID
 *     tags: [Departments]
 */
router.put("/:id", departmentController.updateDepartment);

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete department by ID
 *     tags: [Departments]
 */
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;

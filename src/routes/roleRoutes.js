const express = require("express");
const router = express.Router({ mergeParams: true });

const roleController = require("../controllers/roleController");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management within an employer
 */

/**
 * @swagger
 * /api/employers/{employerId}/roles:
 *   post:
 *     summary: Create a new role for an employer
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 */
router.post("/", roleController.createRole);

/**
 * @swagger
 * /api/employers/{employerId}/roles:
 *   get:
 *     summary: Get all roles for an employer
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer's ID
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get("/", roleController.getRoles);

/**
 * @swagger
 * /api/employers/{employerId}/roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer's ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /api/employers/{employerId}/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer's ID
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       204:
 *         description: Role deleted successfully
 */
router.delete("/:id", roleController.deleteRole);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - employerId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *         name:
 *           type: string
 *           example: "Manager"
 *         description:
 *           type: string
 *           example: "Manages a team of employees"
 *         employerId:
 *           type: string
 *           format: uuid
 *           example: "71af1f19-35c1-4439-bb25-a04b111271ef"
 */

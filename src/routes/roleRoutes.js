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
 * /employers/{employerId}/roles:
 *   post:
 *     summary: Create a new role for an employer
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: manager
 *               description:
 *                 type: string
 *                 example: Manages employees
 *     responses:
 *       201:
 *         description: Role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Role already exists
 *       500:
 *         description: Server error
 */
router.post("/", roleController.createRole);

/**
 * @swagger
 * /employers/{employerId}/roles:
 *   get:
 *     summary: Get all roles for an employer
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Server error
 */
router.get("/", roleController.getRoles);

/**
 * @swagger
 * /employers/{employerId}/roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: supervisor
 *               description:
 *                 type: string
 *                 example: Supervises team members
 *     responses:
 *       200:
 *         description: Role updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /employers/{employerId}/roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: employerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", roleController.deleteRole);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *         name:
 *           type: string
 *           example: "manager"
 *         description:
 *           type: string
 *           example: "Manages a team of employees"
 *         employerId:
 *           type: string
 *           format: uuid
 *           example: "71af1f19-35c1-4439-bb25-a04b111271ef"
 */

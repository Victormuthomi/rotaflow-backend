const express = require("express");
const router = express.Router();
const {
  generateMonthlySchedule,
} = require("../controllers/scheduleController");

/**
 * @swagger
 * /api/employers/{employerId}/schedule:
 *   post:
 *     summary: Generate monthly employee schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restPerWeek:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Monthly schedule created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 schedule:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       employeeId:
 *                         type: string
 *                       employerId:
 *                         type: string
 *                       week:
 *                         type: integer
 *                       status:
 *                         type: string
 *                         enum: [work, rest]
 *       404:
 *         description: No employees found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/:employerId/schedule",
  (req, res, next) => {
    req.body.employerId = req.params.employerId;
    next();
  },
  generateMonthlySchedule,
);

module.exports = router;

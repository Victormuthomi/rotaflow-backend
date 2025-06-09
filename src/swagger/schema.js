/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         nationalId:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         organizationName:
 *           type: string
 *         departmentName:
 *           type: string
 *         password:
 *           type: string

 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         nationalId:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         employerId:
 *           type: string
 *           format: uuid
 *         roleId:
 *           type: string
 *           format: uuid

 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         employerId:
 *           type: string
 *           format: uuid
 *         employeeId:
 *           type: string
 *           format: uuid
 *         week:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *         status:
 *           type: string
 *           enum: [work, rest]
 *         roleId:
 *           type: string
 *           format: uuid
 */

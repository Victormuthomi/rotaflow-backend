const Employee = require("../models/employee");
const Employer = require("../models/employer");
const Role = require("../models/role");

exports.createEmployee = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const { name, nationalId, phoneNumber, email, roleId } = req.body;

    const employer = await Employer.findByPk(employerId);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    if (roleId) {
      const foundRole = await Role.findOne({
        where: { id: roleId, employerId },
      });
      if (!foundRole) {
        return res
          .status(400)
          .json({ message: "Role not found for this employer" });
      }
    }

    const employee = await Employee.create({
      name,
      nationalId,
      phoneNumber,
      email,
      employerId,
      roleId,
    });

    res.status(201).json({ message: "Employee created", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const employer = await Employer.findByPk(employerId);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const employees = await Employee.findAll({
      where: { employerId },
      include: [
        { model: Role, as: "role", attributes: ["id", "name", "description"] },
      ],
    });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { employerId, id } = req.params;
    const employer = await Employer.findByPk(employerId);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const employee = await Employee.findOne({
      where: { id, employerId },
      include: [
        { model: Role, as: "role", attributes: ["id", "name", "description"] },
      ],
    });

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { employerId, id } = req.params;
    const { roleId, ...otherUpdates } = req.body;

    const employee = await Employee.findOne({ where: { id, employerId } });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    if (roleId) {
      const foundRole = await Role.findOne({
        where: { id: roleId, employerId },
      });

      if (!foundRole) {
        return res
          .status(400)
          .json({ message: "Role not found for this employer" });
      }

      otherUpdates.roleId = roleId;
    }

    await employee.update(otherUpdates);

    res.json({ message: "Employee updated", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const transaction = await db.transaction(); // Start transaction

  try {
    const { id, employerId } = req.params;

    // 1. First delete all schedules
    await Schedule.destroy({
      where: { employee_id: id },
      transaction,
    });

    // 2. Then delete the employee
    const result = await Employee.destroy({
      where: {
        id,
        employer_id: employerId,
      },
      transaction,
    });

    if (result === 0) {
      await transaction.rollback();
      return res.status(404).json({ message: "Employee not found" });
    }

    await transaction.commit();
    res.status(204).end();
  } catch (error) {
    await transaction.rollback();
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Deletion failed",
      error: error.message,
    });
  }
};

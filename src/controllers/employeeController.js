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
  try {
    const { employerId, id } = req.params;

    const employee = await Employee.findOne({
      where: { id, employerId },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.destroy();
    res.status(200).json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

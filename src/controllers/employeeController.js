const Employee = require("../models/employee");
const Employer = require("../models/employer");

exports.createEmployee = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const { name, nationalId, phoneNumber, email, role } = req.body;

    const employer = await Employer.findByPk(employerId);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    const employee = await Employee.create({
      name,
      nationalId,
      phoneNumber,
      email,
      role: role || "employee",
      employerId,
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

    const employees = await Employee.findAll({ where: { employerId } });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { employerId, id } = req.params;
    const updates = req.body;

    const employee = await Employee.findOne({ where: { id, employerId } });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.update(updates);

    res.json({ message: "Employee updated", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { employerId, id } = req.params;

    const employee = await Employee.findOne({ where: { id, employerId } });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();

    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

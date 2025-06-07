const { Employee } = require("../models"); // adjust if needed for your models setup

const registerEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register employee", error: error.message });
  }
};

const getEmployeesByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;
    const employees = await Employee.findAll({ where: { employerId } });
    res.json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get employees", error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get employee", error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Employee.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await Employee.findByPk(id);
    res.json(updatedEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update employee", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: error.message });
  }
};

module.exports = {
  registerEmployee,
  getEmployeesByEmployer,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

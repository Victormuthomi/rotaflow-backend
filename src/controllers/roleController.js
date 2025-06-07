const Role = require("../models/role");

// Create a new role for an employer
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { employerId } = req.params;

    const existingRole = await Role.findOne({ where: { name, employerId } });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await Role.create({ name, description, employerId });
    res.status(201).json({ message: "Role created", role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all roles for an employer
exports.getRoles = async (req, res) => {
  try {
    const { employerId } = req.params;
    const roles = await Role.findAll({ where: { employerId } });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a role by id
exports.updateRole = async (req, res) => {
  try {
    const { id, employerId } = req.params;
    const { name, description } = req.body;

    const role = await Role.findOne({ where: { id, employerId } });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.name = name || role.name;
    role.description = description || role.description;
    await role.save();

    res.status(200).json({ message: "Role updated", role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a role by id
exports.deleteRole = async (req, res) => {
  try {
    const { id, employerId } = req.params;

    const role = await Role.findOne({ where: { id, employerId } });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.destroy();
    res.status(200).json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

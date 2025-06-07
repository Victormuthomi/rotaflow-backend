const { Employer } = require("../models");

// Create/Register a new employer
exports.createEmployer = async (req, res) => {
  try {
    const { name, phoneNumber, nationalId, email } = req.body;

    if (!name || !phoneNumber || !nationalId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingEmployer = await Employer.findOne({ where: { nationalId } });
    if (existingEmployer) {
      return res.status(409).json({ message: "Employer already registered" });
    }

    const newEmployer = await Employer.create({
      name,
      phoneNumber,
      nationalId,
      email,
    });

    res.status(201).json(newEmployer);
  } catch (error) {
    console.error("Error creating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all employers
exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.findAll();
    res.json(employers);
  } catch (error) {
    console.error("Error fetching employers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get employer by ID
exports.getEmployerById = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await Employer.findByPk(id);

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json(employer);
  } catch (error) {
    console.error("Error fetching employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update employer by ID
exports.updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, nationalId, email } = req.body;

    const employer = await Employer.findByPk(id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    await employer.update({ name, phoneNumber, nationalId, email });

    res.json(employer);
  } catch (error) {
    console.error("Error updating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete employer by ID
exports.deleteEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await Employer.findByPk(id);

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    await employer.destroy();

    res.json({ message: "Employer deleted successfully" });
  } catch (error) {
    console.error("Error deleting employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

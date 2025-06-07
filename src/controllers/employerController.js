const { Employer } = require("../models");
const { Op } = require("sequelize");

// Helper to validate email format
const isValidEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
};

// Create/Register a new employer
exports.createEmployer = async (req, res) => {
  try {
    const { fullName, phoneNumber, nationalId, email, password } = req.body;

    if (!fullName || !phoneNumber || !nationalId || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if nationalId or email already exists
    const existing = await Employer.findOne({
      where: {
        [Op.or]: [{ nationalId }, { email }],
      },
    });
    if (existing) {
      return res
        .status(409)
        .json({
          message: "Employer with this national ID or email already exists",
        });
    }

    const newEmployer = await Employer.create({
      fullName,
      phoneNumber,
      nationalId,
      email,
      password,
    });

    res.status(201).json(newEmployer);
  } catch (error) {
    console.error("Error creating employer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all employers (exclude passwords)
exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.findAll({
      attributes: { exclude: ["password"] },
    });
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
    const employer = await Employer.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

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
    const { fullName, phoneNumber, nationalId, email, password } = req.body;

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const employer = await Employer.findByPk(id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Check if new nationalId or email is already used by someone else
    if (nationalId || email) {
      const exists = await Employer.findOne({
        where: {
          [Op.or]: [{ nationalId }, { email }],
          id: { [Op.ne]: id }, // exclude current employer
        },
      });
      if (exists) {
        return res
          .status(409)
          .json({
            message: "nationalId or email already in use by another employer",
          });
      }
    }

    await employer.update({
      fullName: fullName ?? employer.fullName,
      phoneNumber: phoneNumber ?? employer.phoneNumber,
      nationalId: nationalId ?? employer.nationalId,
      email: email ?? employer.email,
      password: password ?? employer.password,
    });

    const updated = await Employer.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    res.json(updated);
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

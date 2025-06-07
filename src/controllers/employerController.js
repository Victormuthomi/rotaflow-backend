const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/employer");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Register employer
exports.createEmployer = async (req, res) => {
  try {
    const {
      name,
      nationalId,
      phoneNumber,
      email,
      organizationName,
      departmentName,
      password,
    } = req.body;

    if (
      !name ||
      !nationalId ||
      !phoneNumber ||
      !organizationName ||
      !departmentName ||
      !password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if employer exists
    const existing = await Employer.findOne({ where: { nationalId } });
    if (existing)
      return res
        .status(409)
        .json({ message: "Employer with this National ID already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employer = await Employer.create({
      name,
      nationalId,
      phoneNumber,
      email,
      organizationName,
      departmentName,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        message: "Employer registered successfully",
        employerId: employer.id,
      });
  } catch (error) {
    console.error("Error creating employer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login employer
exports.loginEmployer = async (req, res) => {
  try {
    const { nationalId, password } = req.body;
    if (!nationalId || !password) {
      return res
        .status(400)
        .json({ message: "Missing National ID or password" });
    }

    const employer = await Employer.findOne({ where: { nationalId } });
    if (!employer)
      return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, employer.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: employer.id, nationalId: employer.nationalId },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in employer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all employers (optional - admin only normally)
exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get employer by ID
exports.getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });
    res.json(employer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update employer
exports.updateEmployer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phoneNumber,
      email,
      organizationName,
      departmentName,
      password,
    } = req.body;

    const employer = await Employer.findByPk(id);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }

    await employer.update(req.body);
    res.json({ message: "Employer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete employer
exports.deleteEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByPk(req.params.id);
    if (!employer)
      return res.status(404).json({ message: "Employer not found" });

    await employer.destroy();
    res.json({ message: "Employer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

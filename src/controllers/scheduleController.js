const { Employee, Schedule } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// Shuffle helper
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const generateMonthlySchedule = async (req, res) => {
  const { employerId, restPerWeek } = req.body;

  try {
    const employees = await Employee.findAll({ where: { employerId } });

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found" });
    }

    const totalEmployees = employees.length;

    // 1. Assign each employee to rest on a random week (1-4)
    const restWeeks = {};
    const assignments = {};

    for (let emp of employees) {
      let week;
      let retries = 0;
      do {
        week = Math.floor(Math.random() * 4) + 1; // week 1 to 4
        restWeeks[week] = restWeeks[week] || [];
        retries++;
      } while (restWeeks[week].length >= restPerWeek && retries < 10);

      // Push employee to that week's rest list
      restWeeks[week].push(emp.id);

      // Mark schedule for all weeks
      for (let w = 1; w <= 4; w++) {
        assignments[w] = assignments[w] || [];

        assignments[w].push({
          id: uuidv4(),
          employerId,
          employeeId: emp.id,
          week: w,
          status: w === week ? "rest" : "work",
        });
      }
    }

    // 2. Delete existing schedules for employer (optional, for fresh generation)
    await Schedule.destroy({ where: { employerId } });

    // 3. Save to DB
    const flatSchedules = Object.values(assignments).flat();
    await Schedule.bulkCreate(flatSchedules);

    res
      .status(201)
      .json({ message: "Monthly schedule created", schedule: flatSchedules });
  } catch (error) {
    console.error("❌ Error creating schedule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getScheduleSummary = async (req, res) => {
  try {
    // You can later use req.params.id to filter by employer if needed
    res.json({ message: "Go to /schedules to generate a schedule" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  generateMonthlySchedule,
};

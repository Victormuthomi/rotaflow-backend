const { Employee, Schedule, Role } = require("../models");
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

    const restWeeks = {};
    const assignments = {};

    for (let emp of employees) {
      let week;
      let retries = 0;
      do {
        week = Math.floor(Math.random() * 4) + 1;
        restWeeks[week] = restWeeks[week] || [];
        retries++;
      } while (restWeeks[week].length >= restPerWeek && retries < 10);

      restWeeks[week].push(emp.id);

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

    // Delete existing schedules
    await Schedule.destroy({ where: { employerId } });

    const flatSchedules = Object.values(assignments).flat();
    await Schedule.bulkCreate(flatSchedules);

    // 🔥 Fetch schedules with employee + role included
    const fullSchedule = await Schedule.findAll({
      where: { employerId },
      include: [
        {
          model: Employee,
          attributes: ["name"],
          include: [
            {
              model: Role,
              as: "role",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    // Format response
    const formatted = fullSchedule.map((entry) => ({
      id: entry.id,
      employeeId: entry.employeeId,
      employeeName: entry.Employee?.name || "N/A",
      employeeRole: entry.Employee?.role?.name || "N/A",
      status: entry.status,
      week: entry.week,
    }));

    res.status(201).json({
      message: "Monthly schedule created",
      schedule: formatted,
    });
  } catch (error) {
    console.error("❌ Error creating schedule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  generateMonthlySchedule,
};

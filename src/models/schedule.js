// models/schedule.js
const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Schedule = db.define("Schedule", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  employerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  week: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4,
    },
  },
  status: {
    type: DataTypes.ENUM("work", "rest"),
    allowNull: false,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

// Associations
const Employee = require("./employee");
const Employer = require("./employer");
const Role = require("./role");

Schedule.belongsTo(Employee, { foreignKey: "employeeId" });
Schedule.belongsTo(Role, { foreignKey: "roleId" });
Schedule.belongsTo(Employer, { foreignKey: "employerId" });

module.exports = Schedule;

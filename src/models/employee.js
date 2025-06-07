const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employer = require("./employer");
const Role = require("./role");

const Employee = db.define("Employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationalId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  // Remove role string field
  roleId: {
    type: DataTypes.UUID,
    allowNull: true, // can start null, until employer assigns
    references: {
      model: Role,
      key: "id",
    },
  },
});

Employee.belongsTo(Employer, {
  foreignKey: "employerId",
  onDelete: "CASCADE",
});

// New association: Employee belongs to Role
Employee.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

module.exports = Employee;

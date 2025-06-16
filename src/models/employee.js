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
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Role,
      key: "id",
    },
  },
  employerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employer,
      key: "id",
    },
  },
});

// Associations
Employee.belongsTo(Employer, {
  foreignKey: "employerId",
  onDelete: "CASCADE",
});

Employee.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

module.exports = Employee;

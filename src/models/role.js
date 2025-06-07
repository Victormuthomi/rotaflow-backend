// models/role.js
const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Role = db.define("Role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  employerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Role;

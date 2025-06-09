const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class Schedule extends Model {}

Schedule.init(
  {
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
  },
  {
    sequelize,
    modelName: "Schedule",
    tableName: "Schedules",
    timestamps: true,
  },
);

module.exports = Schedule;

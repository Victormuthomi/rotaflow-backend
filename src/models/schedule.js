module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", {
    weekNumber: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM("WORKING", "RESTING"),
      allowNull: false,
    },
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Employee);
    Schedule.belongsTo(models.Role);
  };

  return Schedule;
};

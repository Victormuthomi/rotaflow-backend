module.exports = (sequelize, DataTypes) => {
  const WorkCycle = sequelize.define("WorkCycle", {
    weeksToWork: DataTypes.INTEGER,
    weeksToRest: DataTypes.INTEGER,
    totalWorkers: DataTypes.INTEGER,
    startWorkers: DataTypes.INTEGER,
  });

  WorkCycle.associate = (models) => {
    WorkCycle.belongsTo(models.Organization);
  };

  return WorkCycle;
};

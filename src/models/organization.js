module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define("Organization", {
    name: DataTypes.STRING,
    department: DataTypes.STRING,
  });

  Organization.associate = (models) => {
    Organization.belongsTo(models.Employer);
    Organization.hasMany(models.Employee);
    Organization.hasMany(models.WorkCycle);
  };

  return Organization;
};


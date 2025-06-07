module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    fullName: DataTypes.STRING,
    nationalId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organization);
    Employee.hasMany(models.Schedule);
  };

  return Employee;
};

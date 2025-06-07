module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define("Employer", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Employer.associate = (models) => {
    Employer.hasMany(models.Organization);
  };

  return Employer;
};

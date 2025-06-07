const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Employer = sequelize.define(
    "Employer",
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      nationalId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      hooks: {
        beforeCreate: async (employer) => {
          if (employer.password) {
            const salt = await bcrypt.genSalt(10);
            employer.password = await bcrypt.hash(employer.password, salt);
          }
        },
        beforeUpdate: async (employer) => {
          if (employer.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            employer.password = await bcrypt.hash(employer.password, salt);
          }
        },
      },
    },
  );

  Employer.associate = (models) => {
    Employer.hasMany(models.Organization);
  };

  Employer.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.password; // exclude password from responses
    return values;
  };

  return Employer;
};

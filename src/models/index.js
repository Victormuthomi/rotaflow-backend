const sequelize = require("../config/db");
const Employer = require("./employer");

const db = {
  sequelize,
  Employer,
};

module.exports = db;

const sequelize = require("../config/db");
const Employer = require("./employer");
const Employee = require("./employee");
const Role = require("./role");

const db = {
  sequelize,
  Employer,
  Employee,
  Role,
};

module.exports = db;

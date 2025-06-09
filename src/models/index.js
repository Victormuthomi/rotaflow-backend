const sequelize = require("../config/db");
const Employer = require("./employer");
const Employee = require("./employee");
const Role = require("./role");
const Schedule = require("./schedule");

const db = {
  sequelize,
  Employer,
  Employee,
  Role,
  Schedule,
};

module.exports = db;

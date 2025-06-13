// config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // disable SQL logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // needed for Render's external DB
    },
  },
});

module.exports = sequelize;

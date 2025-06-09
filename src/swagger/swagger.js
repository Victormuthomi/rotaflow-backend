const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rotaflow API",
      version: "1.0.0",
    },
  },
  // Make sure this glob matches your route files where you write JSDoc comments
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../swagger/schema.js"),
  ],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

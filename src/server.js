const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
const sequelize = require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Docs
require("./swagger/swagger")(app);

// Example route
app.get("/", (req, res) => {
  res.send("Rotaflow backend is running.");
});

// Start server after DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(
        `📄 Swagger docs available at http://localhost:${PORT}/api-docs`,
      );
    });
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

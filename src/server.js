const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// DB with models loaded
const db = require("./models");

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", routes);

// Swagger Docs
require("./swagger/swagger")(app);

// Test route
app.get("/", (req, res) => {
  res.send("Rotaflow backend is running.");
});

// Sync DB and start server
db.sequelize
  .sync({ alter: true }) // You can use { force: true } for dev resets
  .then(() => {
    console.log("✅ Database connected and all models synced.");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📄 Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

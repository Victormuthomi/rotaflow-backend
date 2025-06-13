const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();

// ✅ Correct and ONLY CORS middleware setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://rotaflow-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ✅ Make sure body parser is after CORS and before routes
app.use(express.json());

// Routes
app.use("/api", routes);

// Swagger
require("./swagger/swagger")(app);

// Test route
app.get("/", (req, res) => {
  res.send("Rotaflow backend is running.");
});

// DB
const db = require("./models");

const PORT = process.env.PORT || 5000;

db.sequelize
  .sync({ alter: true })
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

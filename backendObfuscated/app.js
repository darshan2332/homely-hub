const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Homely Hub API Running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/rent/listing", propertyRoutes);
app.use("/api/v1/rent/user", userRoutes);

module.exports = app;

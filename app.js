const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

/* ================= DATABASE ================= */
connectDB();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*", // allow frontend (can restrict later)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 ❌ REMOVE THIS (disk storage not used anymore)
 app.use("/uploads", express.static("uploads"));
*/

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/cars", require("./routes/car.routes"));

/* ================= HEALTH CHECK (Render) ================= */
app.get("/", (req, res) => {
  res.json({ status: "API running 🚀" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

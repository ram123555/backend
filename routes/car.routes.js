const express = require("express");
const Car = require("../models/Car");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

/* ================= ADD CAR (NO AUTH) ================= */
router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const car = await Car.create({
        ...req.body,                         // ✅ save all specs
        brand: req.body.brand?.toUpperCase(),
        type: req.body.type?.toLowerCase(),
        image: req.file.filename,            // filename only
        user: null,                          // ✅ no auth for now
      });

      res.status(201).json(car);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* ================= GET ALL CARS + FILTER ================= */
router.get("/", async (req, res) => {
  try {
    const {
      search,
      brand,
      type,
      fuel,
      city,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    /* 🔍 SEARCH */
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    /* FILTERS */
    if (brand) query.brand = new RegExp(`^${brand}$`, "i");
    if (type) query.type = new RegExp(`^${type}$`, "i");
    if (fuel) query.fuel = fuel;
    if (city) query.city = city;

    /* PRICE RANGE */
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET SINGLE CAR ================= */
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE CAR (NO AUTH) ================= */
router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE CAR (NO AUTH) ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

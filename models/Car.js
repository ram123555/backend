const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
    },

    type: {
      type: String, // SUV, Sedan, Hatchback
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuel: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },

    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },

    owners: {
      type: Number,
      default: 1,
    },

    kilometers: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    /* ================= ENGINE & PERFORMANCE ================= */
    engineType: String,
    displacement: String,
    cylinders: String,
    maxTorque: String,
    gearbox: String,

    /* ================= BODY & DIMENSIONS ================= */
    doors: String,
    seating: String,
    length: String,
    width: String,
    height: String,
    groundClearance: String,

    /* ================= SUSPENSION & BRAKES ================= */
    frontSuspension: String,
    rearSuspension: String,
    frontBrake: String,
    rearBrake: String,

    /* ================= SAFETY & FEATURES ================= */
    abs: Boolean,
    airbags: Boolean,
    sunroof: Boolean,
    cruiseControl: Boolean,
    touchscreen: Boolean,
    androidAuto: Boolean,
    carPlay: Boolean,
    rearAc: Boolean,
    powerSteering: Boolean,
    centralLock: Boolean,
    isofix: Boolean,

    /* ================= MEDIA ================= */
    image: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    /* ================= FLAGS ================= */
    isFeatured: {
      type: Boolean,
      default: true,
    },

    /* ================= USER ================= */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,          // ✅ FIXED
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);

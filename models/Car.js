const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      uppercase: true, // BMW, AUDI
      trim: true,
    },

    model: {
      type: String,
      trim: true,
    },

    type: {
      type: String, // sedan, suv, hatchback
      required: true,
      lowercase: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
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
      min: 1,
    },

    kilometers: {
      type: String, // "75,000 km"
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
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
    abs: {
      type: Boolean,
      default: false,
    },
    airbags: {
      type: Boolean,
      default: false,
    },
    sunroof: {
      type: Boolean,
      default: false,
    },
    cruiseControl: {
      type: Boolean,
      default: false,
    },
    touchscreen: {
      type: Boolean,
      default: false,
    },
    androidAuto: {
      type: Boolean,
      default: false,
    },
    carPlay: {
      type: Boolean,
      default: false,
    },
    rearAc: {
      type: Boolean,
      default: false,
    },
    powerSteering: {
      type: Boolean,
      default: false,
    },
    centralLock: {
      type: Boolean,
      default: false,
    },
    isofix: {
      type: Boolean,
      default: false,
    },

    /* ================= MEDIA ================= */
    image: {
      type: String, // ✅ Cloudinary URL
      required: true,
    },

    images: [
      {
        type: String, // future multiple images (Cloudinary URLs)
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
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);

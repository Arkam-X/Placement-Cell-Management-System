const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["STUDENT", "TPO"],
      required: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role === "STUDENT";
      },
    },
    prn: {
      type: Number,
      required: function () {
        return this.role === "STUDENT";
      },
    },
    year: {
      type: String,
      required: function () {
        return this.role === "STUDENT";
      },
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
      required: function () {
        return this.role === "STUDENT";
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
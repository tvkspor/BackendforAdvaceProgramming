const mongoose = require("mongoose");
const Doctor = require("./DoctorModel");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
    dateofbirth: { type: Date },
    sex: { type: String },
    treatmentcourse: [
      {
        name: { type: String },
        startat: { type: Date },
      },
    ],
    treatmenthistory: [
      {
        day: { type: Date },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
        information_daily: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

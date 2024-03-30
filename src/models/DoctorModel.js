const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    dateofbirth: { type: Date },
    sex: { type: String },
    department: { type: String },
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("Doctor", userSchema);
module.exports = Doctor;

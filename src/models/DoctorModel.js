const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true},
    name: { type: String },
    dateofbirth: { type: Date },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    sex: { type: String },
    department: { type: String },
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

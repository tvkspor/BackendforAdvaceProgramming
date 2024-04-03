const mongoose = require("mongoose");
const patient = require("./UserModel");
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    dateofbirth: { type: Date },
    sex: { type: String },
    department: { type: String },
    task: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
        day: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

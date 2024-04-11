const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isDoctor: { type: Boolean, default: false, required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
    dateofbirth: { type: Date },
    sex: { type: String },
    treatmentcourse: [{}],
    treatmenthistory: [
      {
        day: { type: String },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
        doctorname: { type: String },
        information_daily: { type: String },
      },
    ],
    doctorcourse: [
      {
        patientName: { type: String },
        OrderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
      },
    ],
    doctortask: [
      {
        calender: {type: Date},
        task: {type: String},
      }
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

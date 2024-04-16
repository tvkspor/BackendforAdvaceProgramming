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
    BHXH: { type: String },
    CCCD: { type: String },
    eventData: [
      {
        date: { type: Number },
        month: { type: Number },
        year: { type: Number },
        type: { type: String, default: "warning" },
        content: { type: String },
      },
    ],
    treatmenthistory: [
      {
        day: { type: String },
        doctorname: { type: String },
        information_daily: { type: String },
      },
    ],
    doctorcourse: [
      {
        patientName: { type: String },
        nameOrder: { type: String },
        progress: { type: Number, default: 0 },
        OrderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
        Medicine: [
          {
            type: { type: String },
            medicinename: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;

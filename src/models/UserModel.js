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
    treatmentcourse: [
      {
        name: { type: String },
        startat: { type: Date },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    treatmenthistory: [
      {
        day: { type: String },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
        doctorname: { type: String },
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

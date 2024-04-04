const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema(
  {
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    dateofbirth: { type: Date },
    sex: { type: String },
    city: { type: String },
    treatmentcourse: [
      {
        nameCourse: { type: String },
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
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

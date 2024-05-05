const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    description: { type: String },
    selled: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;

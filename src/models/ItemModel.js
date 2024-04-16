const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    component: { type: String },
    availability: { type: String},
    ID: { type: String },
    importDate: { type: Date },
    image: { type: String},
    //sex: { type: String },
    //department: { type: String },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", userSchema);
module.exports = Item;

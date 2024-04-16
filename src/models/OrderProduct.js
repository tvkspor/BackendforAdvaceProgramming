const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        progress: { type: Number, default: 0 },
        doctor: { type: String, default: "" },
        totalprice: { type: Number, default: " " },
      },
    ],
    addtionalInformation: {
      CCCD: { type: String, required: true },
      BHXH: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    type: { type: String, default: "" },
    itemsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: {
      type: String,
    },
    isChecked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

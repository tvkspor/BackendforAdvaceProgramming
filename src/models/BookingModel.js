const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        totalMorning: { type: Number, default: 100 },
        totalEvening: { type: Number, default: 100 },
        morningCounter: { type: Number, default: 1 },
        eveningCounter: { type: Number, default: 1 },
        detailed: [
            {
                name: { type: String, reqired: true },
                cccd: { type: Number, requied: true },
                birth: { type: Date, required: true },
                email: { type: String, reqired: true },
                sex: { type: String, reqired: true },
                number: { type: Number, required: true },
                session: { type: Boolean, reqired: true },
                address: { type: String, reqired: true },
                symptom: { type: String, required: true },
                stt: { type: Number, default: 1 },
            },
        ],
    },
    {
        timestamps: true,
    }
);
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
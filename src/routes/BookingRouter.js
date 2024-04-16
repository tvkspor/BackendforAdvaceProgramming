const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");
const {
    authUserMiddleWare,
    authMiddleWare,
} = require("../middleware/authMiddleware");
const Booking = require("../models/BookingModel");

router.post("/create", BookingController.createBooking);
router.get("/get-all", BookingController.getAllbooking);
router.put("/update/:id", authMiddleWare, BookingController.updateBooking)
router.get("/get-details/:id", BookingController.getDetailsBooking)
router.delete("/delete/:id", authMiddleWare, BookingController.deleteBooking)
router.post("/delete-many", authMiddleWare, BookingController.deleteManyBooking)

module.exports = router;
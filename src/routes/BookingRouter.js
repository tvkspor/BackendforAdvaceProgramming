const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");
const {
    authUserMiddleWare,
    authMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create", BookingController.createBooking);
router.get("/get-Allbooking/:day", authMiddleWare, BookingController.getAllbooking);
router.get("/find-Booking/:CCCD", authUserMiddleWare, BookingController.findBooking);
router.delete("/delete/:id", authMiddleWare, BookingController.deleteBooking)
router.get("/get-all", BookingController.getAllBooking);
router.post("/delete-many", authMiddleWare, BookingController.deleteManyBooking);
module.exports = router;
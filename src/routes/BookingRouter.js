const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/BookingController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create", BookingController.createBooking);
router.get("/get-Allbooking/:day", BookingController.getAllbooking);

module.exports = router;

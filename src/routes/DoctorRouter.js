const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", DoctorController.createDoctor);
router.get("/get-all-doctor", DoctorController.getAllDoctor);

module.exports = router;

const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", DoctorController.createDoctor);
router.get("/get-all-doctor", DoctorController.getAllDoctor);
router.get(
  "/get-all-doctor-cardiology/",
  DoctorController.getAllDoctorCardiology
);
router.get(
  "/get-all-doctor-nervesurgery/",
  DoctorController.getAllDoctorNervesurgery
);
router.get("/get-all-department", DoctorController.getAllDepartmentDoctor);

module.exports = router;

const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", DoctorController.createDoctor);
// router.get("/get-all-doctor", DoctorController.getAllDoctor);
router.get(
  "/get-all-doctor-cardiology/",
  DoctorController.getAllDoctorCardiology
);
router.get(
  "/get-all-doctor-nervesurgery/",
  DoctorController.getAllDoctorNervesurgery
);
router.get(
  "/get-all-doctor-musculoskeletal/",
  DoctorController.getAllDoctorMusculoskeletal
);
router.get(
  "/get-all-doctor-intensivecare/",
  DoctorController.getAllDoctorIntensivecare
);
router.get(
  "/get-all-doctor-otorhinology/",
  DoctorController.getAllDoctorOtorhinology
);
router.get(
  "/get-all-doctor-pediatrics/",
  DoctorController.getAllDoctorPediatrics
);
router.get("/get-all-department", DoctorController.getAllDepartmentDoctor);
router.put("/update/:id", authMiddleWare, DoctorController.updateDoctor);
router.get("/get-details/:id", DoctorController.getDetailsDoctor);
router.delete("/delete/:id", authMiddleWare, DoctorController.deleteDoctor);
router.post("/delete-many", authMiddleWare, DoctorController.deleteManyDoctor);
router.get("/get-all", DoctorController.getAllDoctor);
router.get("/get-all-type", DoctorController.getAllTypedoctor);

module.exports = router;

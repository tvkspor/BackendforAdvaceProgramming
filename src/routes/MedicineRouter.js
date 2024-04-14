const express = require("express");
const router = express.Router();
const MedicineController = require("../controllers/MedicineController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", MedicineController.createMedicine);
router.get("/getalltype", MedicineController.getAllTypeMedicine);
router.get("/getalltabletsname", MedicineController.getAllTablets);

module.exports = router;

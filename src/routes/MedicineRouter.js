const express = require("express");
const router = express.Router();
const MedicineController = require("../controllers/MedicineController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", MedicineController.createMedicine);
router.get("/getalltype", MedicineController.getAllTypeMedicine);
router.get("/getalltabletsname", MedicineController.getAllTablets);
router.get("/getallliquorsname", MedicineController.getAllLiquor);
router.get("/getallpowdersname", MedicineController.getAllPowder);

router.put('/update/:id', authMiddleWare, MedicineController.updateMedicine)
router.get('/get-details/:id', MedicineController.getDetailsMedicine)
router.delete('/delete/:id', authMiddleWare, MedicineController.deleteMedicine)
router.get('/get-all', MedicineController.getAllMedicine)
router.post('/delete-many', authMiddleWare, MedicineController.deleteMany)
router.get('/get-all-type', MedicineController.getAllType)

module.exports = router;

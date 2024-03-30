const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/DoctorController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", DoctorController.createDoctor);
// router.put('/update/:id', authMiddleWare, DoctorController.updateProduct)
// router.get('/get-details/:id', DoctorController.getDetailsProduct)
// router.delete('/delete/:id', authMiddleWare, DoctorController.deleteProduct)
// router.get('/get-all', DoctorController.getAllProduct)
// router.post('/delete-many', authMiddleWare, DoctorController.deleteMany)
// router.get('/get-all-type', DoctorController.getAllType)

module.exports = router;

const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", ItemController.createItem);
router.put('/update/:id', authMiddleWare, ItemController.updateItem)
router.get('/get-details/:id', ItemController.getDetailsItem)
router.delete('/delete/:id', authMiddleWare, ItemController.deleteItem)
router.get('/get-all', ItemController.getAllItem)
router.post('/delete-many', authMiddleWare, ItemController.deleteMany)
// router.get('/get-all-type', ItemController.getAllType)
// router.get("/get-all", ItemController.getAllItem);
router.get("/get-all-type", ItemController.getAllTypeItem);


module.exports = router;

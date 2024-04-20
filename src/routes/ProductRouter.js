const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/get-details/:id", ProductController.getDetailsProduct);
router.delete("/delete/:id", authMiddleWare, ProductController.deleteProduct);
router.get("/get-all", ProductController.getAllProduct);
router.get("/getcomment/:id", ProductController.getAllComment);
router.post("/delete-many", authMiddleWare, ProductController.deleteMany);
router.get("/get-all-type", ProductController.getAllType);

module.exports = router;

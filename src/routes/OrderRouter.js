const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create/:id", authUserMiddleWare, OrderController.createOrder);
router.get(
  "/get-all-order/:id",
  authUserMiddleWare,
  OrderController.getAllOrderDetails
);
router.get("/get-details-order/:id", OrderController.getDetailsOrder);
router.put("/update-order/:id", OrderController.updateOrder);
router.delete(
  "/cancel-order/:id",
  authUserMiddleWare,
  OrderController.cancelOrderDetails
);
router.get("/get-all-order", authMiddleWare, OrderController.getAllOrder);

module.exports = router;

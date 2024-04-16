const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const DoctorRouter = require("./DoctorRouter");
const MedicineRouter = require("./MedicineRouter");
const BookingRouter = require("./BookingRouter");
const ItemRouter = require("./ItemRouter");



const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/doctor", DoctorRouter);
  app.use("/api/medicine", MedicineRouter);
  app.use("/api/booking", BookingRouter);
  app.use("/api/items", ItemRouter);

  
};

module.exports = routes;

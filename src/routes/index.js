const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const DoctorRouter = require("./DoctorRouter");
const BookingRouter = require("./BookingRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/doctor", DoctorRouter);
  app.use("/api/booking", BookingRouter);
};

module.exports = routes;

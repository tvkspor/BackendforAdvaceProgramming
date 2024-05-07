const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");
router.use(bodyParser.json());
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:email", userController.resetPassword);
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.put("/update-treatment/:id", userController.updatetreatmentCourseUser);
router.put("/update-progress/:id", userController.updateProgress);
router.put(
  "/update-treatmenthistory/:id",
  userController.updatetreatmentHistory
);
router.put("/update-eventdata/:id", userController.updateEventData);
router.put("/update-eventdata2/:id", userController.updateEventData2);
router.put("/update-comment/:id", userController.updateComment);
router.put("/update-medicine/:id", userController.updateMedicine);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);
router.get("/getAll", userController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.get("/gettreatment/:id", userController.gettreatment);
router.get("/gettreatmenthistory/:id", userController.gettreatmentHistory);
router.get("/geteventdata/:id", userController.getEventData);
router.get("/getdoctorcourse/:id", userController.getdoctorCourse);
router.post("/refresh-token", userController.refreshToken);
router.post("/delete-many", authMiddleWare, userController.deleteMany);

module.exports = router;

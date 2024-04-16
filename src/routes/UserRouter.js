const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.put("/update-treatment/:id", userController.updatetreatmentCourseUser);
router.put(
  "/update-treatmenthistory/:id",
  userController.updatetreatmentHistory
);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);
router.get("/getAll", userController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.get("/gettreatment/:id", userController.gettreatment);
router.get("/gettreatmenthistory/:id", userController.gettreatmentHistory);
router.post("/refresh-token", userController.refreshToken);
router.post("/delete-many", authMiddleWare, userController.deleteMany);
router.post("/forgot-password", userController.checkEmail);
router.post("/reset-password/:email", userController.changepassword);

module.exports = router;

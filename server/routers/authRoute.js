import express from "express";
import {
  loginController,
  registerController,
  forgotPasswordController,
  resetPasswordController,
  // testController,
} from "../controller/authController.js";

//router object
const router = express.Router();

//routing

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/forgotPassword", forgotPasswordController);
router.post("/resetPassword", resetPasswordController);

export default router;

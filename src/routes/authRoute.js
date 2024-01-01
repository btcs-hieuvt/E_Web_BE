import express from "express";
import {
  loginController,
  refreshTokenController,
  registerController,
  userLogout,
  updateProfileController,
  getMeController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", requireSignIn, userLogout);
router.get("/me", requireSignIn, getMeController);

router.get("/test", requireSignIn, isAdmin, (req, res) => {
  console.log(req.user);
  res.send("hohohoho");
});

router.put("/profile", requireSignIn, updateProfileController);

export default router;

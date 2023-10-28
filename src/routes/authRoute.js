import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, (req, res) => {
  console.log(req.user);
  res.send("hohohoho");
});

export default router;

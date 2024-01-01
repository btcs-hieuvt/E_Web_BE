import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { paymentController } from "../controllers/orderController.js";

const router = express.Router();

router.post("/payment", requireSignIn, paymentController);

export default router;

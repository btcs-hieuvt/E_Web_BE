import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getOrderController } from "../controllers/orderController.js";

const router = express.Router();

router.get("/get-orders", requireSignIn, getOrderController);

export default router;

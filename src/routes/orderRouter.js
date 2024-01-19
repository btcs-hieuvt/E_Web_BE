import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getOrderController,
  getAllOrderController,
  orderStatusController
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/get-orders", requireSignIn, getOrderController);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;

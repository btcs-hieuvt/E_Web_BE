import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProdutController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, createProductController);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProdutController
);
router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);

export default router;

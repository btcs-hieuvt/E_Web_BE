import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProdutController,
  updateProductController,
  getListProductByCategoryController,
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
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);

//get list product by category

router.get("/category/:slug", getListProductByCategoryController);

export default router;

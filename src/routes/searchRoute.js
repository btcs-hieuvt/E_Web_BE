import express from "express";
import { searchProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", searchProduct);

export default router;

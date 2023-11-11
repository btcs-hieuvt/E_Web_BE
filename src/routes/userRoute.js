import express from "express";
import { deleteUser, getAllUser } from "../controllers/userController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUser);
router.delete("/:id", isAdmin, deleteUser);

export default router;

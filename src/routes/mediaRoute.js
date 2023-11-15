import express from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/mediaController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files", 10), uploadMedia);
export default router;

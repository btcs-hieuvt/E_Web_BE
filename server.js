// import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./src/config/connect.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";

//rest object
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//connect database
connectDB();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

//rest Api
app.get("/", (req, res) => {
  res.send({ message: "wellcom to my APIIIII" });
});

//app listen
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});

// import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./src/config/connect.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import mediaRoute from "./src/routes/mediaRoute.js";
import orderRoute from "./src/routes/orderRouter.js";
import searchRoute from "./src/routes/searchRoute.js";
import paymentRoute from "./src/routes/paymentRoute.js";
import bodyParser from "body-parser";

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect database
connectDB();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/payment", paymentRoute);

//rest Api
app.get("/", (req, res) => {
  res.send({ message: "wellcom to my APIIIII" });
});

//app listen
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});

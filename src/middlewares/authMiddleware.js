import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      const decode = JWT.verify(accessToken, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "You are not authenticated",
        result: null,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};

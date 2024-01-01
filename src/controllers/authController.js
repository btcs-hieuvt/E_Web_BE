import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

let arrayRefreshToken = [];

const generateAccessToken = (user) => {
  return JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const generateRefreshToken = (user) => {
  return JWT.sign({ _id: user._id }, process.env.JWT_REFRESHTOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESHTOKEN_EXPRIES,
  });
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }
    //check user exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "This email is already registered",
      });
    }

    //user not exist -> register
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      address,
      password: hashedPassword,
      phone,
    }).save();

    return res.status(200).send({
      success: true,
      message: "User register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error registering",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email", email);
    console.log("pw", password);
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid password",
      });
    }
    //JWT
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    arrayRefreshToken.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        emal: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({
      success: false,
      message: "You are not authenticated",
      result: null,
    });
  }
  if (!arrayRefreshToken.includes(refreshToken)) {
    return res.status(401).send({
      success: false,
      message: "Refeshtoken is not valid",
      result: null,
    });
  }

  JWT.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
    }
    arrayRefreshToken = arrayRefreshToken.filter(
      (token) => token !== refreshToken
    );
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    arrayRefreshToken.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return res.status(200).send({
      success: true,
      message: "Refresh successfully",
      result: newAccessToken,
    });
  });
};

export const userLogout = async (req, res) => {
  res.clearCookie("refreshToken");

  arrayRefreshToken = arrayRefreshToken.filter(
    (token) => token !== req.cookies.refreshToken
  );
  return res.status(200).send({
    success: true,
    message: "Logged out",
    result: null,
  });
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);

    if (!password && password.lenght < 6) {
      return res.json({ error: "Password required and 8 charactor" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: " update profile success",
      result: updateUser,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error while update profile",
      error,
    });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    return res.status(200).send({
      success: true,
      message: "get profile success",
      result: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error while get your information",
      error,
    });
  }
};

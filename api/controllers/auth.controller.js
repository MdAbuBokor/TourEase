import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "./../utils/error.js";
export const signup = async (req, res, next) => {
  // console.log(req.body);
  //res.send("SignUp");

  const { username, email, password } = req.body;

  const usernameExist = await User.findOne({ username });
  if (usernameExist) return next(errorHandler(400, "Username already exist"));
  const emailExist = await User.findOne({ email });
  if (emailExist) return next(errorHandler(400, "Email already exist"));
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  if (password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }
  if (username.length < 3) {
    return next(errorHandler(400, "Username must be at least 3 characters"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();

    res.status(201).json("new user saved");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credintials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token ", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token ", token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Date.now(),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token ", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {}
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign Out Succesfully !");
  } catch (error) {
    next(error);
  }
};

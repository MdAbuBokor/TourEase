import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Hello World!!!");
};

export const updatedUserInfo = async (req, res, next) => {
  // res.send("updated!");
  if (req.user.id != req.params.id)
    return next(errorHandler(403, "You can update only your account!"));

  try {
    const { username, email, password } = req.body;

    const usernameExist = await User.findOne({ username });
    if (usernameExist) return next(errorHandler(400, "Username already exist"));
    const emailExist = await User.findOne({ email });
    if (emailExist) return next(errorHandler(400, "Email already exist"));

    if (username.length < 3) {
      return next(errorHandler(400, "Username must be at least 3 characters"));
    }

    if (req.body.password) {
      if (password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          pass: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { pass, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(403, "You can delete only your account!"));
  try {
    const delUser = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  // console.log(req.body);
  //res.send("SignUp");

  const { username, email, password } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();

    res.status(201).json("new user saved");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

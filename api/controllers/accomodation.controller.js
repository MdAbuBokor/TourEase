// import Accomodation from "../models/accomodation.model.js";
// import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Hello Accomodation!! !");
};

// export const updatedAccomodationInfo = async (req, res, next) => {
//   // res.send("updated!");
//   if (req.user.id != req.params.id)
//     return next(errorHandler(403, "You can update only your account!"));

//   try {
//     const {
//       name,
//       email,
//       password,
//       accomodation_avatar,
//       description,
//       images,
//       rating,
//       facilities,
//       location,
//       map_loacation,
//       contactInfo,
//       reviews,
//       discount,
//     } = req.body;

//     const nameExist = await Accomodation.findOne({ name });
//     if (nameExist) return next(errorHandler(400, "Name already exist"));
//     const updatedAccomodation = await Accomodation.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           owner: req.body.owner,
//           name: req.body.name,
//           accomodation_avatar: req.body.accomodation_avatar,
//           description: req.body.description,
//           images: req.body.images,
//           rating: req.body.rating,
//           facilities: req.body.facilities,
//           location: req.body.location,
//           contactInfo: req.body.contactInfo,
//           reviews: req.body.reviews,
//           discount: req.body.discount,
//         },
//       },
//       { new: true }
//     );

//     if (username.length < 5) {
//       return next(errorHandler(400, "Username must be at least 3 characters"));
//     }

//     const updatedAccomodation = await Accomodation.findByIdAndUpdate(
//       req.params.id
//     );
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           pass: req.body.password,
//           avatar: req.body.avatar,
//         },
//       },
//       { new: true }
//     );
//     const { pass, ...others } = updatedUser._doc;
//     res.status(200).json(others);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   if (req.user.id != req.params.id)
//     return next(errorHandler(403, "You can delete only your account!"));
//   try {
//     const delUser = await User.findByIdAndDelete(req.params.id);
//     res.clearCookie("access_token");
//     res.status(200).json("User has been deleted");
//   } catch (error) {
//     next(error);
//   }
// };

import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Accommodation from "../models/accomodation.model.js";
import { errorHandler } from "./../utils/error.js";
export const signup = async (req, res, next) => {
  // console.log(req.body);
  // res.send("SignUp");

  const { name, email, password, ...rest } = req.body;

  const nameExist = await Accommodation.findOne({ name });
  if (nameExist) return next(errorHandler(400, "Name already exist"));
  const emailExist = await Accommodation.findOne({ email });
  if (emailExist) return next(errorHandler(400, "Email already exist"));
  if (!name || !email || !password) {
    return next(
      errorHandler(400, "name email and password fields are required")
    );
  }
  if (password.length < 6) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }
  if (name.length < 5) {
    return next(errorHandler(400, "Name must be at least 5 characters"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newAccomodation = new Accommodation({
    name,
    email,
    password: hashPassword,
    ...rest,
  });
  try {
    await newAccomodation.save();

    res.status(201).json("new Accomodation saved");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validAccomodation = await Accommodation.findOne({ email });
    if (!validAccomodation)
      return next(errorHandler(404, "Accomodation not found"));

    const validPassword = bcryptjs.compareSync(
      password,
      validAccomodation.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong Credintials!"));

    const token = jwt.sign(
      { id: validAccomodation._id },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validAccomodation._doc;
    res
      .cookie("accomodation_access_token ", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

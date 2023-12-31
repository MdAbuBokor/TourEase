import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Accommodation from "../models/accommodation.model.js";
import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("Hello Accommodation!! !");
};

export const createAccommodation = async (req, res, next) => {
  try {
    const { name, email, password, ...rest } = req.body;

    const emailExist = await Accommodation.findOne({ email });
    if (emailExist) return next(errorHandler(400, "Email already exists"));

    const nameExist = await Accommodation.findOne({ name });
    if (nameExist) {
      return next(errorHandler(400, "Name already exists"));
    }

    if (name.length < 5) {
      return next(errorHandler(400, "Name must be at least 5 characters"));
    }
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newAccommodation = new Accommodation({
      name,
      password: hashPassword,
      email,
      ...rest,
    });

    await newAccommodation.save();

    res.status(201).json("New Accommodation saved");
  } catch (error) {
    next(error);
  }
};

export const signInAccommodation = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const accExist = await Accommodation.findOne({ email });
    if (!accExist) return next(errorHandler(404, "Accommodation not found"));
    const isMatch = bcryptjs.compareSync(password, accExist.password);
    if (!isMatch) return next(errorHandler(400, "Wrong Password"));

    const token = jwt.sign({ id: accExist._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = accExist._doc;
    res
      .cookie("acc_access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOutAccommodation = async (req, res, next) => {
  try {
    res
      .clearCookie("acc_access_token", { sameSite: "none", secure: true })
      .status(200)
      .json("Accommodation signed out");
  } catch (error) {
    next(error);
  }
};

export const googleAccommodation = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findOne({
      email: req.body.email,
    });
    if (accommodation) {
      const token = jwt.sign({ id: accommodation._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = accommodation._doc;
      res
        .cookie("acc_access_token ", token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      res.send("Accommodation not found");
    }
  } catch (error) {}
};

export const getAccommodationInfo = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id).select(
      "-password"
    );

    if (!accommodation) {
      return next(errorHandler(404, "Accommodation not found"));
    }

    res.status(200).json({ ...accommodation._doc });
  } catch (error) {
    next(error);
  }
};

export const updateAccommodationInfo = async (req, res, next) => {
  try {
    const upaccommodation = await Accommodation.findById(req.params.id);
    if (req.accommodation.id !== req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }
    const { name, email, password, ...rest } = req.body;
    if (req.body.email && req.body.email !== upaccommodation.email) {
      const emailExist = await Accommodation.findOne({ email });
      if (emailExist) return next(errorHandler(400, "Email already exists"));
    }

    if (req.body.name) {
      const nameExist = await Accommodation.findOne({ name });
      if (nameExist && nameExist.name !== upaccommodation.name) {
        return next(errorHandler(400, "Name already exists"));
      }
      if (name.length < 5) {
        return next(errorHandler(400, "Name must be at least 5 characters"));
      }
    }

    if (req.body.password) {
      if (password.length < 6) {
        return next(
          errorHandler(400, "Password must be at least 6 characters")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body } },
      { new: true }
    ).select("-password");

    res.status(200).json({ ...updatedAccommodation._doc });
  } catch (error) {
    next(error);
  }
};

export const deleteAccommodation = async (req, res, next) => {
  if (req.accommodation.id !== req.params.id) {
    return next(errorHandler(403, "You can delete only your account!"));
  }

  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.status(200).json("Accommodation deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ accommodation: req.params.id }).sort({
      roomNumber: 1,
    });
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

import dotenv from "dotenv";
dotenv.config();

import Accommodation from "../models/accomodation.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "./../utils/error.js";

export const test = (req, res) => {
  res.send("Hello Accomodation!! !");
};

export const createAccomodation = async (req, res, next) => {
  try {
    // Check if the user already has an accommodation
    const alreadyAccomodation = await User.findById(req.user.id);

    if (alreadyAccomodation.accomodation) {
      return next(errorHandler(403, "You can create only one Accommodation!"));
    }

    // Ensure the user is creating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can create only your account!"));
    }

    const { name, ...rest } = req.body;

    // Check if the name is already taken
    const nameExist = await Accommodation.findOne({ name });
    if (nameExist) {
      return next(errorHandler(400, "Name already exists"));
    }

    // Validate the length of the name
    if (name.length < 5) {
      return next(errorHandler(400, "Name must be at least 5 characters"));
    }

    // Create a new Accommodation
    const newAccomodation = new Accommodation({
      name,
      ...rest,
    });

    await newAccomodation.save();

    // Update the User document with the new accommodation reference
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { accomodation: newAccomodation._id } },
      { new: true }
    );

    res.status(201).json("New Accommodation saved");
  } catch (error) {
    next(error);
  }
};

export const getAccomodationInfo = async (req, res, next) => {
  try {
    // Fetch the accommodation information
    const accommodation = await Accommodation.findOne({ owner: req.params.id });

    if (!accommodation) {
      return next(errorHandler(404, "Accommodation not found"));
    }

    // Extract relevant fields from the accommodation
    const { _id, name, ...others } = accommodation._doc;

    res.status(200).json({ _id, name, ...others });
  } catch (error) {
    next(error);
  }
};

// Example: Replace 'user_id_here' with the actual user ID

export const updateAccomodationInfo = async (req, res, next) => {
  try {
    // Ensure the user is updating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }

    const { name, ...rest } = req.body;

    // Check if the new name already exists
    const nameExist = await Accommodation.findOne({ name });
    if (nameExist) {
      return next(errorHandler(400, "Name already exists"));
    }

    // Validate the length of the new name
    if (name.length < 5) {
      return next(errorHandler(400, "Name must be at least 5 characters"));
    }

    const user = await User.findById(req.user.id);

    // Update the accommodation information
    const updatedAccomodation = await Accommodation.findByIdAndUpdate(
      user.accomodation,
      { $set: { ...req.body } },
      { new: true }
    );

    // Extract relevant fields from the updated accommodation
    const { _id, name: updatedName, ...others } = updatedAccomodation._doc;

    res.status(200).json({ _id, name: updatedName, ...others });
  } catch (error) {
    next(error);
  }
};

export const deleteAccomodation = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can delete only your account!"));
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const accommodationId = user.accomodation;

    if (accommodationId) {
      await Accommodation.findByIdAndDelete(accommodationId);
      await User.findByIdAndUpdate(
        req.user.id,
        { $set: { accomodation: null } },
        { new: true }
      );

      res.status(200).json("Accommodation has been deleted");
    } else {
      return next(errorHandler(404, "Accommodation not found for the user"));
    }
  } catch (error) {
    next(error);
  }
};

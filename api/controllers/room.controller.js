import dotenv from "dotenv";
dotenv.config();

import Accommodation from "../models/accomodation.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

export const createRoom = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can create only your account!"));
    }
    const user = await User.findById(req.user.id);

    if (!user.accomodation) {
      return next(
        errorHandler(
          403,
          "You can create a room after creating an accommodation!"
        )
      );
    }

    const existingRoom = await Room.findOne({
      roomNumber: req.body.roomNumber,
      accomodation: user.accomodation,
    });

    if (existingRoom) {
      return next(
        errorHandler(403, "Room Number already exists in this accommodation!")
      );
    }

    req.body.accomodation = user.accomodation;
    const newRoom = new Room(req.body);

    await newRoom.save();
    await Accommodation.findByIdAndUpdate(
      user.accomodation,
      {
        $push: { rooms: newRoom._id },
      },
      { new: true }
    );

    res.status(201).json("New room has been saved");
  } catch (error) {
    next(error);
  }
};

export const updateRoomInfo = async (req, res, next) => {
  try {
    // Ensure the user is updating their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }
    const user = await User.findById(req.user.id);

    await Room.findOneAndUpdate(
      {
        roomNumber: req.body.roomNumber,
        accomodation: user.accomodation,
      },
      req.body,
      { new: true }
    ); //room Number should be not updatedable from client

    res.status(200).json("Room has been updated");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    // Ensure the user is deleting their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(403, "You can delete only your account!"));
    }

    const user = await User.findById(req.user.id);

    // Find the room to be deleted
    const roomToDelete = await Room.findOne({
      roomNumber: req.body.roomNumber,
      accomodation: user.accomodation,
    });

    if (!roomToDelete) {
      return next(errorHandler(404, "Room not found"));
    }

    // Delete the room
    await roomToDelete.delete();

    // Update the accomodation by removing the deleted room from its rooms array
    await Accommodation.findByIdAndUpdate(
      user.accomodation,
      {
        $pull: { rooms: roomToDelete._id },
      },
      { new: true }
    );

    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

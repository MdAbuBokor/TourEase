import dotenv from "dotenv";
import Accommodation from "../models/accommodation.model.js";
import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";
dotenv.config();

export const createRoom = async (req, res, next) => {
  try {
    req.body.accommodation = req.params.id;
    if (req.accommodation.id !== req.params.id) {
      return next(errorHandler(403, "You can create only your account!"));
    }

    const existingRoom = await Room.findOne({
      roomNumber: req.body.roomNumber,
      accommodation: req.params.id,
    });

    if (existingRoom) {
      return next(
        errorHandler(403, "Room Number already exists in this accommodation!")
      );
    }

    req.body.accommodation = req.params.id;
    const newRoom = new Room(req.body);

    await newRoom.save();
    await Accommodation.findByIdAndUpdate(
      req.params.id,
      {
        $push: { rooms: newRoom._id },
      },
      { new: true }
    );

    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomInfo = async (req, res, next) => {
  try {
    // Ensure the user is updating their own account
    if (req.accommodation.id !== req.params.id) {
      return next(errorHandler(403, "You can update only your account!"));
    }

    const roomId = req.query.roomId;
    const roomToUpdate = await Room.findById(roomId);

    if (!roomToUpdate) {
      return next(errorHandler(404, "Room not found"));
    }

    // Check if the room number is being changed
    if (req.body.roomNumber !== roomToUpdate.roomNumber) {
      const existingRoom = await Room.findOne({
        roomNumber: req.body.roomNumber,
        accommodation: req.params.id,
      });

      if (existingRoom) {
        return next(
          errorHandler(403, "Room Number already exists in this accommodation!")
        );
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, {
      new: true,
    });

    res.status(200).json("Room has been updated");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    // Ensure the user is deleting their own account
    if (req.accommodation.id !== req.params.id) {
      return next(errorHandler(403, "You can delete only your account!"));
    }

    // Find the room to be deleted
    await Room.findByIdAndDelete(req.query.roomId);

    // Update the accomodation by removing the deleted room from its rooms array
    await Accommodation.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { rooms: req.query.roomId },
      },
      { new: true }
    );

    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

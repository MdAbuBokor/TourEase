import express from "express";
import {
  AddNewImage,
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoomInfo,
} from "../controllers/room.controller.js";
import { verifyToken } from "./../utils/verifyAccommodation.js";

const router = express.Router();

router.post("/createRoom/:id", verifyToken, createRoom);
router.post("/updateRoom/:id", verifyToken, updateRoomInfo);
router.post("/updateRoomImage/:id", verifyToken, AddNewImage);
router.delete("/deleteRoom/:id", verifyToken, deleteRoom);
router.get("/getRoom/:roomId", getRoom);
router.get("/getAllRoom/", getAllRoom);
//router.get("/getRoom/?accommodationId&roomNumber");

export default router;

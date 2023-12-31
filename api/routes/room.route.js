import express from "express";
import {
  createRoom,
  deleteRoom,
  updateRoomInfo,
} from "../controllers/room.controller.js";
import { verifyToken } from "./../utils/verifyAccommodation.js";

const router = express.Router();

router.post("/createRoom/:id", verifyToken, createRoom);
router.post("/updateRoom/:id", verifyToken, updateRoomInfo);
router.delete("/deleteRoom/:id", verifyToken, deleteRoom);
//router.get("/getRoom/?accommodationId&roomNumber");

export default router;

import express from "express";
import {
  AddNewImage,
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoomInfo,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/createRoom/:id", createRoom);
router.post("/updateRoom/:id", updateRoomInfo);
router.post("/updateRoomImage/:id", AddNewImage);
router.delete("/deleteRoom/:id", deleteRoom);
router.get("/getRoom/:roomId", getRoom);
router.get("/getAllRoom/", getAllRoom);
//router.get("/getRoom/?accommodationId&roomNumber");

export default router;

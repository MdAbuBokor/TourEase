import express from "express";

import {
  createAccommodation,
  deleteAccommodation,
  getAccommodationInfo,
  getRooms,
  googleAccommodation,
  signInAccommodation,
  signOutAccommodation,
  test,
  updateAccommodationInfo,
} from "../controllers/accommodation.controller.js";

import { verifyToken } from "../utils/verifyAccommodation.js";

const router = express.Router();

router.get("/test", test);

router.post("/createAccommodation", createAccommodation);
router.post("/signInAccommodation", signInAccommodation);
router.post("/googleAccommodation", googleAccommodation);
router.post("/updateAccommodation/:id", verifyToken, updateAccommodationInfo);
router.delete("/deleteAccommodation/:id", verifyToken, deleteAccommodation);
router.get("/getAccommodation/:id", getAccommodationInfo);
router.get("/getrooms/:id", getRooms);
router.get("/signOutAccommodation", signOutAccommodation);

export default router;

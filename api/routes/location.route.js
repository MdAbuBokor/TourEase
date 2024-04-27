import express from "express";
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  updateLocation,
} from "../controllers/location.controller.js";

const router = express.Router();

router.get("/getAllLocations", getAllLocations);
router.post("/create", createLocation);
router.delete("/delete/:id", deleteLocation);
router.post("/update/:id", updateLocation);

export default router;

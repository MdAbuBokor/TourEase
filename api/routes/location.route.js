import express from "express";
import { getAllLocations } from "../controllers/location.controller.js";

const router = express.Router();

router.get("/getAllLocations", getAllLocations);

export default router;

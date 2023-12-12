import express from "express";

import {
  createAccomodation,
  deleteAccomodation,
  getAccomodationInfo,
  test,
  updateAccomodationInfo,
} from "../controllers/accomodation.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

router.post("/createAccomodation/:id", verifyToken, createAccomodation);
router.post("/updateAccomodation/:id", verifyToken, updateAccomodationInfo);
router.delete("/deleteAccomodation/:id", verifyToken, deleteAccomodation);

router.get("/getAccomodation/:id", getAccomodationInfo);

export default router;

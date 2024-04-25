import express from "express";

import {
  createRoomReview,
  getAvgRatingOfAcc,
  getReviewofAcc,
} from "../controllers/roomReview.controller.js";

const router = express.Router();

router.post("/create", createRoomReview);
router.get("/getAccReview/:accommodationId", getReviewofAcc);
router.get("/getAvgRatingOfAcc/:accommodationId", getAvgRatingOfAcc);

export default router;

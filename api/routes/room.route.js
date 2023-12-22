import express from "express";

const router = express.Router();

router.post("/createRoom/:id", verifyToken, createAccomodation);
router.post("/updateRoom/:id", verifyToken, updateAccomodationInfo);
router.delete("/deleteRoom/:id", verifyToken, deleteAccomodation);

router.get("/getRoom/:id", getAccomodationInfo);

export default router;

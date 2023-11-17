import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/google", google);

export default router;

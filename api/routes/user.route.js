import express from "express";
import {
  deleteUser,
  getUserInfo,
  test,
  updatedUserInfo,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updatedUserInfo);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/getuser/:id", verifyToken, getUserInfo);

export default router;

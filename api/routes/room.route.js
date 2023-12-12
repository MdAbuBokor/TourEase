import express from "express";



const router = express.Router();

router.get("/test", test);
//router.post("/update/:id", verifyToken, updatedAccomodationInfo);
// router.post("/update/:id", verifyToken, updatedUserInfo);
// router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/", signup);
router.post("/signin", signin);

export default router;

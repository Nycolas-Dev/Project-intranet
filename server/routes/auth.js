import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


router.post("/register", verifyToken, verifyAdmin, register);
router.post("/login", login);

// //CREATEALL FOR INITIATE PROJECT
// router.post("/createall", createAllUser);

export default router;

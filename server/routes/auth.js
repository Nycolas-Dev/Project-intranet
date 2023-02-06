import express from "express";
import { createAllUser, login, register } from "../controllers/auth.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);

//CREATEALL
router.post("/createall", createAllUser);

export default router;

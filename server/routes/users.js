import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getRandomUser,
  getAllUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

//GET RANDOM
router.get("/random", verifyToken, getRandomUser);

//GET
router.get("/:id", verifyToken, getUser);

//GET ALL
router.get("/", verifyToken, getAllUser);

export default router;
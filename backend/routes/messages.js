import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getUsers,
  getMessages,
  sentMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sentMessages);

export default router;

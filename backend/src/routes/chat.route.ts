import {
  createMessage,
  createRoom,
  getMessages,
  getRooms,
} from "../controllers/chat.controller";
import express from "express";

const router = express.Router();

router.post("/chat", createRoom);
router.get("/chat/:id", getRooms);
router.post("/message", createMessage);
router.get("/message/:id", getMessages);

export default router;

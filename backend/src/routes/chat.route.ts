import { createRoom } from "controllers/chat.controller";
import express from "express";

const router = express.Router();

router.post("/chat", createRoom);

export default router;

import { getRoomById } from "../controllers/chat.controller";
import express from "express";

const router = express.Router();

router.get("/room/:id", getRoomById);

export default router;

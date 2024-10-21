import { createReply, getReply } from "../controllers/reply.controller";
import express from "express";

const router = express.Router();

router.post("/reply", createReply);
router.get("/reply/:id", getReply);

export default router;

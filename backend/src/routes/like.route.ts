import { createLike, getLike } from "../controllers/like.controller";
import express from "express";

const router = express.Router();

router.post("/like", createLike);
router.get("/like/:id", getLike);

export default router;

import { createLike, getLike, unLike } from "../controllers/like.controller";
import express from "express";

const router = express.Router();

router.post("/like", createLike);
router.get("/like/:id", getLike);
router.delete("/like/:id", unLike);

export default router;

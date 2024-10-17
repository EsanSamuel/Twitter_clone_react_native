import { createComment, getComments } from "../controllers/comment.controller";
import express from "express";

const router = express.Router();

router.post("/comment", createComment);
router.get("/comment/:id", getComments);

export default router;

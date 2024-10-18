import {
  createPost,
  getPostById,
  getPosts,
  getUserPost,
} from "../controllers/post.controller";
import express from "express";

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPosts);
router.get("/post/:id", getPostById);
router.get("/userpost/:id", getUserPost);

export default router;

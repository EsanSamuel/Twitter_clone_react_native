import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getUserPost,
  updatePost,
} from "../controllers/post.controller";
import express from "express";

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPosts);
router.get("/post/:id", getPostById);
router.get("/userpost/:id", getUserPost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;

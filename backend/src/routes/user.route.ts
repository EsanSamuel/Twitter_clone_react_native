import { createUser, getUser, updateUser } from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.post("/auth/register", createUser);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);

export default router;

import { getAllUsers } from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/allusers/:id", getAllUsers);

export default router;

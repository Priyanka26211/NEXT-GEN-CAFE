import express from "express";
import { upsertUser, listUsers } from "../controllers/userController.js";

const router = express.Router();

// Upsert user info (create or update)
router.post("/", upsertUser);

// Optional: list recent users
router.get("/", listUsers);

export default router;

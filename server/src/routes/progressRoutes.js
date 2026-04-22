import express from "express";
import { getUserProgress, updateProgress, upsertProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, upsertProgress);
router.get("/user/:userId", protect, getUserProgress);
router.put("/:id", protect, updateProgress);

export default router;

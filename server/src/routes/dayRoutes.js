import express from "express";
import { deleteDay, updateDay } from "../controllers/dayController.js";
import { createExercise, listExercises } from "../controllers/exerciseController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();
const coachOnly = [protect, authorize("admin", "coach")];

router.route("/:dayId").put(coachOnly, updateDay).delete(coachOnly, deleteDay);
router.route("/:dayId/exercises").get(protect, listExercises).post(coachOnly, createExercise);

export default router;

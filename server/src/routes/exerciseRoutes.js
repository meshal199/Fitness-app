import express from "express";
import { deleteExercise, updateExercise } from "../controllers/exerciseController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();
const coachOnly = [protect, authorize("admin", "coach")];

router.route("/exercises/:id").put(coachOnly, updateExercise).delete(coachOnly, deleteExercise);

export default router;

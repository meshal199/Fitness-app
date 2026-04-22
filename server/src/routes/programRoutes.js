import express from "express";
import { body } from "express-validator";
import {
  createProgram,
  deleteProgram,
  duplicateProgram,
  getProgram,
  listPrograms,
  updateProgram
} from "../controllers/programController.js";
import { authorize, protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createDay, listDays } from "../controllers/dayController.js";

const router = express.Router();
const coachOnly = [protect, authorize("admin", "coach")];

router.route("/").get(protect, listPrograms).post(coachOnly, [body("name").trim().notEmpty()], validate, createProgram);
router.post("/:id/duplicate", coachOnly, duplicateProgram);
router.route("/:id").get(protect, getProgram).put(coachOnly, updateProgram).delete(coachOnly, deleteProgram);
router.route("/:id/days").get(protect, listDays).post(coachOnly, createDay);

export default router;

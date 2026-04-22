import express from "express";
import {
  createAssignment,
  getUserAssignments,
  listAssignments,
  updateAssignment
} from "../controllers/assignmentController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, authorize("admin", "coach"), listAssignments).post(protect, authorize("admin", "coach"), createAssignment);
router.get("/user/:userId", protect, getUserAssignments);
router.put("/:id", protect, authorize("admin", "coach"), updateAssignment);

export default router;

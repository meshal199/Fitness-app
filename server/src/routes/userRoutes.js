import express from "express";
import { listUsers } from "../controllers/userController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, authorize("admin", "coach"), listUsers);

export default router;

import express from "express";
import { body } from "express-validator";
import { login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["admin", "coach", "trainee"])
  ],
  validate,
  register
);
router.post("/login", [body("email").isEmail().normalizeEmail(), body("password").notEmpty()], validate, login);
router.get("/me", protect, me);

export default router;

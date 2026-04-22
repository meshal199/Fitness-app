import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Assignment from "../models/Assignment.js";
import Exercise from "../models/Exercise.js";
import Program from "../models/Program.js";
import User from "../models/User.js";
import WorkoutDay from "../models/WorkoutDay.js";
import { workoutPlan } from "./workoutPlan.js";

dotenv.config();

async function seed() {
  await connectDB();
  await Promise.all([
    Assignment.deleteMany({}),
    Exercise.deleteMany({}),
    WorkoutDay.deleteMany({}),
    Program.deleteMany({}),
    User.deleteMany({})
  ]);

  const coach = await User.create({
    name: "Demo Coach",
    email: "coach@example.com",
    password: "password123",
    role: "coach"
  });
  const trainee = await User.create({
    name: "Demo Trainee",
    email: "trainee@example.com",
    password: "password123",
    role: "trainee"
  });

  const program = await Program.create({
    name: workoutPlan.name,
    description: workoutPlan.description,
    totalDays: workoutPlan.totalDays,
    status: workoutPlan.status,
    isTemplate: workoutPlan.isTemplate,
    createdBy: coach._id
  });

  for (const day of workoutPlan.days) {
    const workoutDay = await WorkoutDay.create({
      programId: program._id,
      dayNumber: day.dayNumber,
      title: day.title,
      focusArea: day.focusArea,
      warmup: day.warmup,
      cardio: day.cardio,
      notes: day.notes
    });

    await Exercise.insertMany(
      day.exercises.map((exercise) => ({
        ...exercise,
        dayId: workoutDay._id,
        notes: {
          en: "Use controlled tempo and clean form.",
          ar: "استخدم حركة متحكم بها وأداء صحيح."
        }
      }))
    );
  }

  await Assignment.create({
    userId: trainee._id,
    programId: program._id,
    startDate: new Date(),
    status: "active"
  });

  console.log("Seed complete");
  console.log("Coach: coach@example.com / password123");
  console.log("Trainee: trainee@example.com / password123");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

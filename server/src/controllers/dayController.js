import Exercise from "../models/Exercise.js";
import WorkoutDay from "../models/WorkoutDay.js";

export async function createDay(req, res) {
  const day = await WorkoutDay.create({ ...req.body, programId: req.params.id });
  res.status(201).json(day);
}

export async function listDays(req, res) {
  const days = await WorkoutDay.find({ programId: req.params.id }).sort({ dayNumber: 1 });
  res.json(days);
}

export async function updateDay(req, res) {
  const day = await WorkoutDay.findByIdAndUpdate(req.params.dayId, req.body, { new: true, runValidators: true });
  if (!day) return res.status(404).json({ message: "Workout day not found" });
  res.json(day);
}

export async function deleteDay(req, res) {
  const day = await WorkoutDay.findByIdAndDelete(req.params.dayId);
  if (!day) return res.status(404).json({ message: "Workout day not found" });
  await Exercise.deleteMany({ dayId: req.params.dayId });
  res.json({ message: "Workout day deleted" });
}

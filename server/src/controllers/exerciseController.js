import Exercise from "../models/Exercise.js";

export async function createExercise(req, res) {
  const exercise = await Exercise.create({ ...req.body, dayId: req.params.dayId });
  res.status(201).json(exercise);
}

export async function listExercises(req, res) {
  const { search, circuitGroup } = req.query;
  const query = { dayId: req.params.dayId };

  if (search) query.name = { $regex: search, $options: "i" };
  if (circuitGroup) query.circuitGroup = circuitGroup;

  const exercises = await Exercise.find(query).sort({ order: 1 });
  res.json(exercises);
}

export async function updateExercise(req, res) {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!exercise) return res.status(404).json({ message: "Exercise not found" });
  res.json(exercise);
}

export async function deleteExercise(req, res) {
  const exercise = await Exercise.findByIdAndDelete(req.params.id);
  if (!exercise) return res.status(404).json({ message: "Exercise not found" });
  res.json({ message: "Exercise deleted" });
}

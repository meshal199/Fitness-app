import Progress from "../models/Progress.js";

export async function upsertProgress(req, res) {
  const payload = {
    ...req.body,
    userId: req.user.role === "trainee" ? req.user._id : req.body.userId,
    completedAt: req.body.completed ? new Date() : null
  };

  const query = {
    userId: payload.userId,
    programId: payload.programId,
    dayId: payload.dayId,
    exerciseId: payload.exerciseId || null,
    type: payload.type || "exercise"
  };

  const progress = await Progress.findOneAndUpdate(query, payload, { upsert: true, new: true, runValidators: true });
  res.status(201).json(progress);
}

export async function getUserProgress(req, res) {
  if (req.user.role === "trainee" && String(req.user._id) !== req.params.userId) {
    return res.status(403).json({ message: "You can only view your own progress" });
  }

  const query = { userId: req.params.userId };
  if (req.query.programId) query.programId = req.query.programId;

  const progress = await Progress.find(query).sort({ updatedAt: -1 });
  res.json(progress);
}

export async function updateProgress(req, res) {
  const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!progress) return res.status(404).json({ message: "Progress record not found" });
  res.json(progress);
}

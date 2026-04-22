import Assignment from "../models/Assignment.js";
import Exercise from "../models/Exercise.js";
import Program from "../models/Program.js";
import WorkoutDay from "../models/WorkoutDay.js";

async function canAccessProgram(user, programId) {
  if (["admin", "coach"].includes(user.role)) return true;
  return Assignment.exists({ userId: user._id, programId, status: { $in: ["active", "completed"] } });
}

export async function listPrograms(req, res) {
  const { search, status } = req.query;
  const query = { deletedAt: null };

  if (status) query.status = status;
  if (search) query.name = { $regex: search, $options: "i" };

  if (req.user.role === "trainee") {
    const assignments = await Assignment.find({ userId: req.user._id }).select("programId");
    query._id = { $in: assignments.map((assignment) => assignment.programId) };
  }

  const programs = await Program.find(query).populate("createdBy", "name email role").sort({ createdAt: -1 });
  res.json(programs);
}

export async function createProgram(req, res) {
  const program = await Program.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(program);
}

export async function getProgram(req, res) {
  const allowed = await canAccessProgram(req.user, req.params.id);
  if (!allowed) return res.status(403).json({ message: "Program is not assigned to this user" });

  const program = await Program.findOne({ _id: req.params.id, deletedAt: null }).populate("createdBy", "name email role");
  if (!program) return res.status(404).json({ message: "Program not found" });

  const days = await WorkoutDay.find({ programId: program._id }).sort({ dayNumber: 1 });
  const exercises = await Exercise.find({ dayId: { $in: days.map((day) => day._id) } }).sort({ order: 1 });
  const dayPayload = days.map((day) => ({
    ...day.toObject(),
    exercises: exercises.filter((exercise) => String(exercise.dayId) === String(day._id))
  }));

  res.json({ ...program.toObject(), days: dayPayload });
}

export async function updateProgram(req, res) {
  const program = await Program.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, {
    new: true,
    runValidators: true
  });
  if (!program) return res.status(404).json({ message: "Program not found" });
  res.json(program);
}

export async function deleteProgram(req, res) {
  const program = await Program.findByIdAndUpdate(req.params.id, { deletedAt: new Date(), status: "inactive" }, { new: true });
  if (!program) return res.status(404).json({ message: "Program not found" });
  res.json({ message: "Program archived", program });
}

export async function duplicateProgram(req, res) {
  const source = await Program.findById(req.params.id);
  if (!source) return res.status(404).json({ message: "Program not found" });

  const clone = await Program.create({
    name: `${source.name} Copy`,
    description: source.description,
    totalDays: source.totalDays,
    status: "draft",
    createdBy: req.user._id,
    isTemplate: source.isTemplate
  });

  const days = await WorkoutDay.find({ programId: source._id });
  for (const day of days) {
    const clonedDay = await WorkoutDay.create({
      ...day.toObject(),
      _id: undefined,
      programId: clone._id,
      createdAt: undefined,
      updatedAt: undefined
    });
    const exercises = await Exercise.find({ dayId: day._id });
    await Exercise.insertMany(
      exercises.map((exercise) => ({
        ...exercise.toObject(),
        _id: undefined,
        dayId: clonedDay._id,
        createdAt: undefined,
        updatedAt: undefined
      }))
    );
  }

  res.status(201).json(clone);
}

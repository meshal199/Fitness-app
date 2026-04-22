import Assignment from "../models/Assignment.js";

export async function createAssignment(req, res) {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(await assignment.populate(["userId", "programId"]));
}

export async function listAssignments(req, res) {
  const query = {};
  if (req.query.status) query.status = req.query.status;
  if (req.query.programId) query.programId = req.query.programId;

  const assignments = await Assignment.find(query).populate("userId", "name email role").populate("programId", "name status totalDays");
  res.json(assignments);
}

export async function getUserAssignments(req, res) {
  if (req.user.role === "trainee" && String(req.user._id) !== req.params.userId) {
    return res.status(403).json({ message: "You can only view your own assignments" });
  }

  const assignments = await Assignment.find({ userId: req.params.userId }).populate("programId", "name description status totalDays");
  res.json(assignments);
}

export async function updateAssignment(req, res) {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  res.json(assignment);
}

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    status: { type: String, enum: ["active", "completed", "paused"], default: "active" }
  },
  { timestamps: true }
);

assignmentSchema.index({ userId: 1, programId: 1 });

export default mongoose.model("Assignment", assignmentSchema);

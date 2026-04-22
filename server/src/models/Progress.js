import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutDay", required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise", default: null },
    type: { type: String, enum: ["day", "exercise", "cardio"], default: "exercise" },
    completed: { type: Boolean, default: false },
    skipped: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
    remarks: { type: String, default: "" }
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, programId: 1, dayId: 1, exerciseId: 1 });

export default mongoose.model("Progress", progressSchema);

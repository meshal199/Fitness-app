import mongoose from "mongoose";

const textBlockSchema = new mongoose.Schema(
  {
    en: { type: String, default: "" },
    ar: { type: String, default: "" }
  },
  { _id: false }
);

const warmupSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    duration: { type: String, default: "" },
    speed: { type: String, default: "" },
    gradient: { type: String, default: "" },
    instructions: { type: String, default: "" },
    notes: { type: textBlockSchema, default: () => ({}) }
  },
  { _id: false }
);

const cardioSchema = new mongoose.Schema(
  {
    machine: { type: String, required: true },
    targetHeartRate: { type: String, default: "" },
    time: { type: String, default: "" },
    speed: { type: String, default: "" },
    level: { type: String, default: "" },
    gradient: { type: String, default: "" },
    timing: { type: String, enum: ["before", "after"], default: "after" },
    notes: { type: textBlockSchema, default: () => ({}) }
  },
  { timestamps: true }
);

const workoutDaySchema = new mongoose.Schema(
  {
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    focusArea: { type: String, default: "" },
    warmup: { type: warmupSchema, default: () => ({}) },
    cardio: { type: [cardioSchema], default: [] },
    notes: { type: textBlockSchema, default: () => ({}) }
  },
  { timestamps: true }
);

workoutDaySchema.index({ programId: 1, dayNumber: 1 }, { unique: true });

export default mongoose.model("WorkoutDay", workoutDaySchema);

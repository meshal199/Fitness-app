import mongoose from "mongoose";

const textBlockSchema = new mongoose.Schema(
  {
    en: { type: String, default: "" },
    ar: { type: String, default: "" }
  },
  { _id: false }
);

const exerciseSchema = new mongoose.Schema(
  {
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutDay", required: true },
    name: { type: String, required: true, trim: true },
    sets: { type: String, default: "" },
    reps: { type: String, default: "" },
    rest: { type: String, default: "" },
    preNote: { type: String, default: "" },
    circuitGroup: { type: String, default: "" },
    circuitInstructions: { type: String, default: "" },
    order: { type: Number, default: 0 },
    mediaUrl: { type: String, default: "" },
    notes: { type: textBlockSchema, default: () => ({}) }
  },
  { timestamps: true }
);

exerciseSchema.index({ dayId: 1, order: 1 });
exerciseSchema.index({ name: "text" });

export default mongoose.model("Exercise", exerciseSchema);

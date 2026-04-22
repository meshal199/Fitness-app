import React from "react";
import { Plus, Save, Trash2 } from "lucide-react";

export default function ProgramForm({ value, onChange, onSubmit, saving }) {
  function updateField(field, nextValue) {
    onChange({ ...value, [field]: nextValue });
  }

  function updateDay(index, nextDay) {
    const days = [...value.days];
    days[index] = nextDay;
    onChange({ ...value, days, totalDays: days.length });
  }

  function addDay() {
    onChange({
      ...value,
      totalDays: value.days.length + 1,
      days: [
        ...value.days,
        {
          dayNumber: value.days.length + 1,
          title: `Day ${value.days.length + 1}`,
          focusArea: "",
          warmup: { title: "", duration: "", speed: "", gradient: "", instructions: "", notes: { en: "", ar: "" } },
          notes: { en: "", ar: "" },
          cardio: [],
          exercises: []
        }
      ]
    });
  }

  return (
    <form className="editor-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Program name
          <input value={value.name} onChange={(event) => updateField("name", event.target.value)} required />
        </label>
        <label>
          Status
          <select value={value.status} onChange={(event) => updateField("status", event.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      <label>
        Description
        <textarea value={value.description} onChange={(event) => updateField("description", event.target.value)} rows="3" />
      </label>

      <div className="editor-days">
        {value.days.map((day, index) => (
          <DayEditor key={index} day={day} onChange={(nextDay) => updateDay(index, nextDay)} />
        ))}
      </div>

      <div className="editor-actions">
        <button type="button" className="secondary-button" onClick={addDay}>
          <Plus size={18} /> Add day
        </button>
        <button type="submit" className="primary-button" disabled={saving}>
          <Save size={18} /> {saving ? "Saving..." : "Save program"}
        </button>
      </div>
    </form>
  );
}

function DayEditor({ day, onChange }) {
  function setDay(field, nextValue) {
    onChange({ ...day, [field]: nextValue });
  }

  function setWarmup(field, nextValue) {
    onChange({ ...day, warmup: { ...day.warmup, [field]: nextValue } });
  }

  function setWarmupNote(lang, nextValue) {
    onChange({ ...day, warmup: { ...day.warmup, notes: { ...day.warmup.notes, [lang]: nextValue } } });
  }

  function addExercise() {
    setDay("exercises", [
      ...(day.exercises || []),
      { name: "", sets: "", reps: "", rest: "", preNote: "", circuitGroup: "", order: (day.exercises || []).length + 1, notes: { en: "", ar: "" } }
    ]);
  }

  function updateExercise(index, nextExercise) {
    const exercises = [...(day.exercises || [])];
    exercises[index] = nextExercise;
    setDay("exercises", exercises);
  }

  function removeExercise(index) {
    setDay("exercises", day.exercises.filter((_, itemIndex) => itemIndex !== index));
  }

  function addCardio() {
    setDay("cardio", [...(day.cardio || []), { machine: "", time: "", speed: "", level: "", gradient: "", targetHeartRate: "", notes: { en: "", ar: "" } }]);
  }

  function updateCardio(index, nextCardio) {
    const cardio = [...(day.cardio || [])];
    cardio[index] = nextCardio;
    setDay("cardio", cardio);
  }

  return (
    <section className="editor-day">
      <div className="form-grid">
        <label>
          Day title
          <input value={day.title} onChange={(event) => setDay("title", event.target.value)} />
        </label>
        <label>
          Focus area
          <input value={day.focusArea} onChange={(event) => setDay("focusArea", event.target.value)} />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Warm-up title
          <input value={day.warmup?.title || ""} onChange={(event) => setWarmup("title", event.target.value)} />
        </label>
        <label>
          Duration
          <input value={day.warmup?.duration || ""} onChange={(event) => setWarmup("duration", event.target.value)} />
        </label>
      </div>

      <label>
        Warm-up instructions
        <textarea value={day.warmup?.instructions || ""} onChange={(event) => setWarmup("instructions", event.target.value)} />
      </label>
      <label>
        Arabic warm-up notes
        <textarea dir="rtl" value={day.warmup?.notes?.ar || ""} onChange={(event) => setWarmupNote("ar", event.target.value)} />
      </label>

      <div className="mini-header">
        <h3>Exercises</h3>
        <button type="button" className="secondary-button" onClick={addExercise}>
          <Plus size={16} /> Add exercise
        </button>
      </div>

      {(day.exercises || []).map((exercise, index) => (
        <div className="exercise-editor-row" key={index}>
          <input placeholder="Exercise" value={exercise.name} onChange={(event) => updateExercise(index, { ...exercise, name: event.target.value })} />
          <input placeholder="Sets" value={exercise.sets} onChange={(event) => updateExercise(index, { ...exercise, sets: event.target.value })} />
          <input placeholder="Reps" value={exercise.reps} onChange={(event) => updateExercise(index, { ...exercise, reps: event.target.value })} />
          <input placeholder="Rest" value={exercise.rest} onChange={(event) => updateExercise(index, { ...exercise, rest: event.target.value })} />
          <input placeholder="Circuit" value={exercise.circuitGroup} onChange={(event) => updateExercise(index, { ...exercise, circuitGroup: event.target.value })} />
          <button type="button" className="icon-button danger" onClick={() => removeExercise(index)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <div className="mini-header">
        <h3>Cardio</h3>
        <button type="button" className="secondary-button" onClick={addCardio}>
          <Plus size={16} /> Add cardio
        </button>
      </div>

      {(day.cardio || []).map((cardio, index) => (
        <div className="cardio-editor-row" key={index}>
          {["machine", "time", "speed", "level", "gradient", "targetHeartRate"].map((field) => (
            <input key={field} placeholder={field} value={cardio[field] || ""} onChange={(event) => updateCardio(index, { ...cardio, [field]: event.target.value })} />
          ))}
        </div>
      ))}

      <label>
        Daily English notes
        <textarea value={day.notes?.en || ""} onChange={(event) => setDay("notes", { ...day.notes, en: event.target.value })} />
      </label>
      <label>
        Daily Arabic notes
        <textarea dir="rtl" value={day.notes?.ar || ""} onChange={(event) => setDay("notes", { ...day.notes, ar: event.target.value })} />
      </label>
    </section>
  );
}

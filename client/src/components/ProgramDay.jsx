import React from "react";
import { CheckCircle2, Circle, Flame, HeartPulse, Timer } from "lucide-react";
import api from "../api/http";
import { useAuth } from "../context/AuthContext";

function groupExercises(exercises) {
  return exercises.reduce((groups, exercise) => {
    const group = exercise.circuitGroup || "Main";
    groups[group] = groups[group] || [];
    groups[group].push(exercise);
    return groups;
  }, {});
}

export default function ProgramDay({ programId, day, progress, onProgress }) {
  const { user } = useAuth();
  const grouped = groupExercises(day.exercises || []);

  async function toggleExercise(exercise) {
    const existing = progress.find((item) => item.exerciseId === exercise._id && item.type === "exercise");
    await api.post("/progress", {
      userId: user._id,
      programId,
      dayId: day._id,
      exerciseId: exercise._id,
      type: "exercise",
      completed: !existing?.completed
    });
    onProgress();
  }

  async function toggleDay() {
    const existing = progress.find((item) => item.dayId === day._id && item.type === "day" && !item.exerciseId);
    await api.post("/progress", {
      userId: user._id,
      programId,
      dayId: day._id,
      type: "day",
      completed: !existing?.completed
    });
    onProgress();
  }

  const dayDone = progress.some((item) => item.dayId === day._id && item.type === "day" && item.completed);

  return (
    <section className="day-panel">
      <header className="day-header">
        <div>
          <p className="eyebrow">Day {day.dayNumber}</p>
          <h2>{day.title}</h2>
          <span>{day.focusArea}</span>
        </div>
        <button className="complete-button" onClick={toggleDay}>
          {dayDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {dayDone ? "Completed" : "Mark day"}
        </button>
      </header>

      <div className="info-grid">
        <article className="section-block">
          <div className="block-title">
            <Flame size={18} /> Warm-up
          </div>
          <h3>{day.warmup?.title}</h3>
          <p>{day.warmup?.instructions}</p>
          <div className="metric-row">
            <span><Timer size={15} /> {day.warmup?.duration || "Flexible"}</span>
            {day.warmup?.speed && <span>Speed {day.warmup.speed}</span>}
            {day.warmup?.gradient && <span>Gradient {day.warmup.gradient}</span>}
          </div>
          <p className="arabic" dir="rtl">{day.warmup?.notes?.ar}</p>
        </article>

        <article className="section-block notes-block">
          <div className="block-title">Notes</div>
          <p>{day.notes?.en}</p>
          <p className="arabic" dir="rtl">{day.notes?.ar}</p>
        </article>
      </div>

      <div className="exercise-stack">
        {Object.entries(grouped).map(([group, exercises]) => (
          <div className="exercise-card" key={group}>
            <div className="exercise-card-header">
              <h3>{group}</h3>
              <span>{exercises.length} exercises</span>
            </div>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Done</th>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Rest</th>
                    <th>Pre</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise) => {
                    const done = progress.some((item) => item.exerciseId === exercise._id && item.completed);
                    return (
                      <tr key={exercise._id}>
                        <td>
                          <button className="icon-button" onClick={() => toggleExercise(exercise)} aria-label="Toggle exercise">
                            {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                          </button>
                        </td>
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                        <td>{exercise.rest}</td>
                        <td>{exercise.preNote || "-"}</td>
                        <td>
                          <span>{exercise.notes?.en}</span>
                          <small dir="rtl">{exercise.notes?.ar}</small>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <article className="section-block cardio-block">
        <div className="block-title">
          <HeartPulse size={18} /> Cardio
        </div>
        <div className="cardio-grid">
          {(day.cardio || []).map((item) => (
            <div key={item._id} className="cardio-item">
              <strong>{item.machine}</strong>
              <span>Time: {item.time}</span>
              {item.speed && <span>Speed: {item.speed}</span>}
              {item.level && <span>Level: {item.level}</span>}
              {item.gradient && <span>Gradient: {item.gradient}</span>}
              <span>Target HR: {item.targetHeartRate}</span>
              <small dir="rtl">{item.notes?.ar}</small>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

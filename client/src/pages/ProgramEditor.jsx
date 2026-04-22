import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/http";
import ProgramForm from "../components/ProgramForm";

const emptyProgram = {
  name: "",
  description: "",
  status: "draft",
  totalDays: 1,
  days: [
    {
      dayNumber: 1,
      title: "Day 1",
      focusArea: "",
      warmup: { title: "", duration: "", speed: "", gradient: "", instructions: "", notes: { en: "", ar: "" } },
      notes: { en: "", ar: "" },
      cardio: [],
      exercises: []
    }
  ]
};

export default function ProgramEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProgram);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const { data } = await api.get(`/programs/${id}`);
      setForm(data);
    }
    load();
  }, [id]);

  async function saveDay(programId, day) {
    const dayPayload = {
      dayNumber: day.dayNumber,
      title: day.title,
      focusArea: day.focusArea,
      warmup: day.warmup,
      cardio: day.cardio,
      notes: day.notes
    };
    const { data: savedDay } = day._id
      ? await api.put(`/days/${day._id}`, dayPayload)
      : await api.post(`/programs/${programId}/days`, dayPayload);

    for (const exercise of day.exercises || []) {
      const payload = { ...exercise };
      delete payload._id;
      if (exercise._id) await api.put(`/exercises/${exercise._id}`, payload);
      else await api.post(`/days/${savedDay._id}/exercises`, payload);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    const programPayload = {
      name: form.name,
      description: form.description,
      status: form.status,
      totalDays: form.days.length
    };

    try {
      const { data: program } = id ? await api.put(`/programs/${id}`, programPayload) : await api.post("/programs", programPayload);
      for (const day of form.days) {
        await saveDay(program._id, day);
      }
      navigate(`/app/programs/${program._id}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin editor</p>
          <h1>{id ? "Edit program" : "Create program"}</h1>
        </div>
      </header>
      <ProgramForm value={form} onChange={setForm} onSubmit={handleSubmit} saving={saving} />
    </div>
  );
}

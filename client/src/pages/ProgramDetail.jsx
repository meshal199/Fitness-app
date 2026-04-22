import { Edit3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/http";
import ProgramDay from "../components/ProgramDay";
import { useAuth } from "../context/AuthContext";

export default function ProgramDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [program, setProgram] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [progress, setProgress] = useState([]);
  const isCoach = ["admin", "coach"].includes(user?.role);

  async function loadProgram() {
    const { data } = await api.get(`/programs/${id}`);
    setProgram(data);
  }

  async function loadProgress() {
    const { data } = await api.get(`/progress/user/${user._id}`, { params: { programId: id } });
    setProgress(data);
  }

  useEffect(() => {
    loadProgram();
    loadProgress();
  }, [id]);

  if (!program) return <div className="screen-center">Loading program...</div>;

  const day = program.days?.[activeDay];

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">{program.status}</p>
          <h1>{program.name}</h1>
          <p>{program.description}</p>
        </div>
        {isCoach && (
          <Link className="secondary-button" to={`/programs/${id}/edit`}>
            <Edit3 size={18} /> Edit
          </Link>
        )}
      </header>

      <div className="day-tabs">
        {program.days?.map((item, index) => (
          <button className={activeDay === index ? "active" : ""} onClick={() => setActiveDay(index)} key={item._id}>
            Day {item.dayNumber}
            <span>{item.focusArea}</span>
          </button>
        ))}
      </div>

      {day && <ProgramDay programId={program._id} day={day} progress={progress} onProgress={loadProgress} />}
    </div>
  );
}

import { Copy, Eye, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/http";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const isCoach = ["admin", "coach"].includes(user?.role);

  async function loadPrograms() {
    const { data } = await api.get("/programs", { params: { search } });
    setPrograms(data);
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  async function duplicate(id) {
    await api.post(`/programs/${id}/duplicate`);
    loadPrograms();
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">{isCoach ? "Coach dashboard" : "My training"}</p>
          <h1>{isCoach ? "Workout programs" : "Assigned program"}</h1>
        </div>
        {isCoach && (
          <Link className="primary-button" to="/programs/new">
            <Plus size={18} /> New program
          </Link>
        )}
      </header>

      <div className="toolbar">
        <Search size={18} />
        <input placeholder="Search by program name" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === "Enter" && loadPrograms()} />
        <button className="secondary-button" onClick={loadPrograms}>Search</button>
      </div>

      <div className="program-grid">
        {programs.map((program) => (
          <article className="program-card" key={program._id}>
            <div>
              <span className={`status-pill ${program.status}`}>{program.status}</span>
              <h2>{program.name}</h2>
              <p>{program.description}</p>
            </div>
            <div className="card-meta">
              <span>{program.totalDays} days</span>
              <span>Created by {program.createdBy?.name || "Coach"}</span>
            </div>
            <div className="card-actions">
              <Link className="secondary-button" to={`/programs/${program._id}`}>
                <Eye size={17} /> Open
              </Link>
              {isCoach && (
                <button className="secondary-button" onClick={() => duplicate(program._id)}>
                  <Copy size={17} /> Duplicate
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

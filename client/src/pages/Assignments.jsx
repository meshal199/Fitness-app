import React, { useEffect, useState } from "react";
import api from "../api/http";

export default function Assignments() {
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ userId: "", programId: "", startDate: new Date().toISOString().slice(0, 10), status: "active" });

  async function load() {
    const [usersRes, programsRes, assignmentsRes] = await Promise.all([
      api.get("/users", { params: { role: "trainee" } }),
      api.get("/programs"),
      api.get("/assignments")
    ]);
    setUsers(usersRes.data);
    setPrograms(programsRes.data);
    setAssignments(assignmentsRes.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();
    await api.post("/assignments", form);
    await load();
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Coach tools</p>
          <h1>User assignments</h1>
        </div>
      </header>

      <form className="assignment-form" onSubmit={submit}>
        <select value={form.userId} onChange={(event) => setForm({ ...form, userId: event.target.value })} required>
          <option value="">Select trainee</option>
          {users.map((user) => <option value={user._id} key={user._id}>{user.name}</option>)}
        </select>
        <select value={form.programId} onChange={(event) => setForm({ ...form, programId: event.target.value })} required>
          <option value="">Select program</option>
          {programs.map((program) => <option value={program._id} key={program._id}>{program.name}</option>)}
        </select>
        <input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} />
        <button className="primary-button" type="submit">Assign</button>
      </form>

      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Program</th>
              <th>Status</th>
              <th>Start date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.userId?.name}</td>
                <td>{assignment.programId?.name}</td>
                <td>{assignment.status}</td>
                <td>{new Date(assignment.startDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

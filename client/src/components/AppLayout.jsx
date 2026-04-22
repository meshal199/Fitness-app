import React from "react";
import { ClipboardList, Dumbbell, LogOut, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const isCoach = ["admin", "coach"].includes(user?.role);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-mark">FP</div>
          <h1 className="brand-title">Fitness Program</h1>
          <p className="brand-subtitle">{user?.name}</p>
        </div>

        <nav className="nav-stack">
          <NavLink to="/app" className="nav-item">
            <ClipboardList size={18} /> Programs
          </NavLink>
          {isCoach && (
            <NavLink to="/app/programs/new" className="nav-item">
              <Dumbbell size={18} /> Program Editor
            </NavLink>
          )}
          {isCoach && (
            <NavLink to="/app/assignments" className="nav-item">
              <Users size={18} /> Assignments
            </NavLink>
          )}
        </nav>

        <button className="ghost-button" onClick={logout}>
          <LogOut size={18} /> Sign out
        </button>
      </aside>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

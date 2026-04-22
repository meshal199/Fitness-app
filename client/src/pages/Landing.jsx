import React, { useState } from "react";
import { CalendarDays, MessageCircle, PlayCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import programView from "../assets/landing-program-view.png";
import editorView from "../assets/landing-editor-view.png";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function tryDemo() {
    setLoading(true);
    setError("");
    try {
      await login("coach@example.com", "password123");
      navigate("/app");
    } catch {
      setError("Demo login is not ready yet. Seed the hosted database, then try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="landing-brand">Fitness Program Manager</div>
        <Link className="secondary-button" to="/login">Login</Link>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow">For coaches and personal trainers</p>
          <h1>Manage your clients&apos; workout programs in one place</h1>
          <p>Replace Excel sheets and WhatsApp messages with a simple system.</p>

          <div className="landing-actions">
            <button className="primary-button" onClick={tryDemo} disabled={loading}>
              <PlayCircle size={18} /> {loading ? "Opening..." : "Try Demo"}
            </button>
            <a className="secondary-button" href="mailto:coach@example.com?subject=Book%20a%20Demo">
              <CalendarDays size={18} /> Book a Demo
            </a>
          </div>
          {error && <div className="error-box">{error}</div>}
        </div>

        <div className="landing-screenshots">
          <figure>
            <img src={programView} alt="Program view with Day 1 and Day 2 tabs and exercise table" />
            <figcaption>Program view: days, warm-up, exercises, cardio</figcaption>
          </figure>
          <figure>
            <img src={editorView} alt="Clean workout program editor screen" />
            <figcaption>Clean UI for editing exercises and plans</figcaption>
          </figure>
        </div>
      </section>

      <section className="landing-points">
        <div>
          <MessageCircle size={20} />
          <span>No more scattered WhatsApp instructions</span>
        </div>
        <div>
          <CalendarDays size={20} />
          <span>Day-by-day plans for every client</span>
        </div>
        <div>
          <PlayCircle size={20} />
          <span>Demo data ready for coaches to test</span>
        </div>
      </section>
    </main>
  );
}

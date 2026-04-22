import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Assignments from "./pages/Assignments";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramEditor from "./pages/ProgramEditor";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="programs/new" element={<ProgramEditor />} />
        <Route path="programs/:id" element={<ProgramDetail />} />
        <Route path="programs/:id/edit" element={<ProgramEditor />} />
        <Route path="assignments" element={<Assignments />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

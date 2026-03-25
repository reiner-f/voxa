import React, { createContext, useContext, useState, useEffect } from "react";
import { mockSessions, initializeMockData } from "../data/mockData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [studentSession, setStudentSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeMockData();
    const savedUser = localStorage.getItem("voxUser");
    const savedStudent = localStorage.getItem("voxStudent");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedStudent) {
      setStudentSession(JSON.parse(savedStudent));
    }
    setLoading(false);
  }, []);

  const loginTeacher = (email, password) => {
    const mockTeachers = [
      { id: 1, email: "profesor@liceu.ro", name: "Prof. Mangir Gabriela", school: "Colegiul National A.T. Laurian, Botosani" },
      { id: 2, email: "enseignant@lycee.fr", name: "Prof. Mangir Gabriela", school: "Colegiul National A.T. Laurian, Botosani" }
    ];
    const teacher = mockTeachers.find((t) => t.email === email);
    if (teacher) {
      const userData = { ...teacher, role: "teacher" };
      setUser(userData);
      localStorage.setItem("voxUser", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const joinSession = (code) => {
    let sessions = JSON.parse(localStorage.getItem("voxSessions") || "[]");
    if (sessions.length === 0) {
      sessions = mockSessions;
      localStorage.setItem("voxSessions", JSON.stringify(mockSessions));
    }
    const session = sessions.find((s) => s.code === code && s.status === "active");
    if (session) {
      const studentData = { sessionId: session.id, sessionCode: code, joinedAt: new Date().toISOString() };
      setStudentSession(studentData);
      localStorage.setItem("voxStudent", JSON.stringify(studentData));
      return { success: true, session };
    }
    return { success: false, error: "Session not found or inactive" };
  };

  const logout = () => {
    setUser(null);
    setStudentSession(null);
    localStorage.removeItem("voxUser");
    localStorage.removeItem("voxStudent");
  };

  const logoutStudent = () => {
    setStudentSession(null);
    localStorage.removeItem("voxStudent");
  };

  return (
    <AuthContext.Provider value={{ user, studentSession, loading, loginTeacher, joinSession, logout, logoutStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

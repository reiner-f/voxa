import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { initializeMockData } from "./data/mockData";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentJoin from "./pages/StudentJoin";
import StudentVote from "./pages/StudentVote";
import VoteResults from "./pages/VoteResults";
import Education from "./pages/Education";
import Quiz from "./pages/Quiz";
import Team from "./pages/Team";

export default function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/student/join" element={<StudentJoin />} />
        <Route path="/student/vote" element={<StudentVote />} />
        <Route path="/results/:sessionId" element={<VoteResults />} />
        <Route path="/education" element={<Education />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  );
}

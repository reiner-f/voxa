import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Plus,
  Users,
  Vote,
  BarChart3,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Copy,
  Trash2
} from "lucide-react";
import Navbar from "../components/Navbar";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { mockSessions, mockClasses, mockCandidates } from "../data/mockData";

export default function TeacherDashboard() {
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("sessions");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/teacher/login");
      return;
    }
    const storedSessions = JSON.parse(localStorage.getItem("voxSessions") || "[]");
    setSessions(storedSessions.length > 0 ? storedSessions : mockSessions);
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const getClassName = (classId) => {
    const cls = mockClasses.find((c) => c.id === classId);
    return cls ? cls.name : "Unknown";
  };

  const getVoteCount = (sessionId) => {
    const votes = JSON.parse(localStorage.getItem("voxVotes") || "[]");
    return votes.filter((v) => v.sessionId === sessionId).length;
  };

  const stats = {
    totalSessions: sessions.length,
    activeSessions: sessions.filter((s) => s.status === "active").length,
    totalVotes: sessions.reduce((acc, s) => acc + getVoteCount(s.id), 0),
    avgParticipation: "78%"
  };

  if (!user) return null;

  return (
    <div id="teacher-dashboard-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="md" position="bottom-right" />
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-medium text-white mb-2">
                    {t("teacher.dashboard")}
                  </h1>
                  <p className="text-lg font-extralight text-white/60">
                    {t("teacher.welcomeBack")}, {user.name} - C.N. A.T. Laurian, Botoșani
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-lg flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {t("teacher.createSession")}
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-surface-400/50 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-royal-700/30 flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6 text-royal-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">
                        {stats.totalSessions}
                      </p>
                      <p className="text-lg font-extralight text-white/60">
                        {t("teacher.sessions")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-surface-400/50 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">
                        {stats.activeSessions}
                      </p>
                      <p className="text-lg font-extralight text-white/60">
                        {t("teacher.active")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-surface-400/50 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Vote className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">
                        {stats.totalVotes}
                      </p>
                      <p className="text-lg font-extralight text-white/60">
                        {t("teacher.totalVotes")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-surface-400/50 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">
                        {stats.avgParticipation}
                      </p>
                      <p className="text-lg font-extralight text-white/60">
                        {t("teacher.avgParticipation")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-4 mb-6 border-b border-white/10">
                {["sessions", "candidates"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-lg font-extralight transition-colors relative ${
                      activeTab === tab ? "text-gold-400" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tab === "sessions" ? t("teacher.sessions") : t("teacher.candidates")}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                      />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "sessions" && (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-surface-400/50 rounded-xl p-6 border border-white/10 hover:border-royal-600/50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="font-display text-xl font-medium text-white">
                              {session.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-lg font-extralight border ${getStatusColor(
                                session.status
                              )}`}
                            >
                              {getStatusIcon(session.status)}
                              {t(`teacher.${session.status}`)}
                            </span>
                          </div>
                          <p className="text-lg font-extralight text-white/60 mb-4">
                            {getClassName(session.classId)} • {session.candidates.length} {t("teacher.candidates").toLowerCase()}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-surface-300 rounded-lg">
                              <span className="text-lg font-mono text-gold-400">
                                {session.code}
                              </span>
                              <button
                                onClick={() => copyCode(session.code)}
                                className="p-1 hover:bg-surface-200 rounded transition-colors"
                              >
                                <Copy className="w-4 h-4 text-white/60" />
                              </button>
                            </div>
                            <span className="text-lg font-extralight text-white/40">
                              {getVoteCount(session.id)} {t("teacher.votes")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link to={`/results/${session.id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 rounded-lg bg-royal-700/30 text-royal-300 text-lg font-extralight flex items-center gap-2 hover:bg-royal-700/50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              {t("teacher.viewResults")}
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "candidates" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCandidates.slice(0, 6).map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      whileHover={{ y: -4 }}
                      className="bg-surface-400/50 rounded-xl overflow-hidden border border-white/10"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl font-medium text-white mb-2">
                          {candidate.name}
                        </h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-royal-700/30 text-royal-300 text-lg font-extralight">
                          {t(`archetypes.${candidate.archetype}`)}
                        </span>
                        <p className="mt-3 text-lg font-extralight text-white/50">
                          {candidate.memeStyle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateSessionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

function CreateSessionModal({ onClose }) {
  const [sessionName, setSessionName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const { t, language } = useLanguage();

  const handleCreate = () => {
    const code = `VOX-2026-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const newSession = {
      id: Date.now(),
      code,
      name: sessionName,
      classId: parseInt(selectedClass),
      teacherId: 1,
      status: "active",
      createdAt: new Date().toISOString(),
      candidates: selectedCandidates,
      votes: []
    };

    const sessions = JSON.parse(localStorage.getItem("voxSessions") || "[]");
    sessions.push(newSession);
    localStorage.setItem("voxSessions", JSON.stringify(sessions));
    onClose();
    window.location.reload();
  };

  const toggleCandidate = (id) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-400 rounded-2xl border border-white/10 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="font-display text-2xl font-medium text-white mb-6">
          {t("teacher.createSession")}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-extralight text-white/80 mb-2">
              {t("teacher.sessionName")}
            </label>
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-300 border border-white/10 text-white text-lg font-extralight focus:outline-none focus:border-royal-500"
              placeholder="Ex: Simulare Alegeri Europene 2026"
            />
          </div>

          <div>
            <label className="block text-lg font-extralight text-white/80 mb-2">
              {t("teacher.classLabel")}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-300 border border-white/10 text-white text-lg font-extralight focus:outline-none focus:border-royal-500"
            >
              <option value="">{t("teacher.selectClass")}</option>
              {mockClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.school}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-extralight text-white/80 mb-3">
              {t("teacher.candidates")} ({selectedCandidates.length} {t("teacher.candidatesSelected")})
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {mockCandidates.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => toggleCandidate(candidate.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCandidates.includes(candidate.id)
                      ? "border-gold-400 bg-gold-400/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <p className="text-lg font-extralight text-white">{candidate.name}</p>
                  <p className="text-lg font-extralight text-white/50">
                    {t(`archetypes.${candidate.archetype}`)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/20 text-white text-lg font-extralight hover:bg-white/5 transition-colors"
            >
              {t("teacher.cancel")}
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreate}
              disabled={!sessionName || !selectedClass || selectedCandidates.length < 2}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-lg disabled:opacity-50"
            >
              {t("teacher.createBtn")}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Users, Vote, Download, Share2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import BrandWatermark from "../components/BrandWatermark";
import { mockCandidates, mockSessions } from "../data/mockData";

const COLORS = ["#003399", "#fbbf24", "#22c55e", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#ec4899"];

export default function VoteResults() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [votes, setVotes] = useState([]);
  const [candidateResults, setCandidateResults] = useState([]);
  const [demographicData, setDemographicData] = useState({ gender: [], age: [] });
  const { t, language } = useLanguage();

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("voxSessions") || JSON.stringify(mockSessions));
    const currentSession = sessions.find((s) => s.id === parseInt(sessionId));
    if (currentSession) {
      setSession(currentSession);

      const allVotes = JSON.parse(localStorage.getItem("voxVotes") || "[]");
      const sessionVotes = allVotes.filter((v) => v.sessionId === parseInt(sessionId));
      setVotes(sessionVotes);

      const results = currentSession.candidates.map((candidateId) => {
        const candidate = mockCandidates.find((c) => c.id === candidateId);
        const voteCount = sessionVotes.filter((v) => v.candidateId === candidateId).length;
        return {
          id: candidateId,
          name: candidate?.name || "Unknown",
          votes: voteCount,
          percentage: sessionVotes.length > 0 ? ((voteCount / sessionVotes.length) * 100).toFixed(1) : 0,
          archetype: candidate?.archetype || "unknown"
        };
      }).sort((a, b) => b.votes - a.votes);

      setCandidateResults(results);

      const genderCounts = { M: 0, F: 0, NB: 0 };
      const ageCounts = { "15": 0, "16": 0, "17": 0, "18": 0 };

      sessionVotes.forEach((vote) => {
        if (vote.demographics) {
          genderCounts[vote.demographics.gender]++;
          ageCounts[vote.demographics.age]++;
        }
      });

      setDemographicData({
        gender: [
          { name: t("results.male"), value: genderCounts.M, color: "#003399" },
          { name: t("results.female"), value: genderCounts.F, color: "#fbbf24" }
        ],
        age: [
          { age: `15 ${t("results.years")}`, votes: ageCounts["15"] },
          { age: `16 ${t("results.years")}`, votes: ageCounts["16"] },
          { age: `17 ${t("results.years")}`, votes: ageCounts["17"] },
          { age: `18 ${t("results.years")}`, votes: ageCounts["18"] }
        ]
      });
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen bg-surface-500 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div id="vote-results-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="lg" position="bottom-left" />
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t("results.back")}
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white transition-colors"
                >
                  {t("results.home")}
                </Link>
                <Link
                  to="/student/join"
                  className="inline-flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white transition-colors"
                >
                  {t("results.otherSession")}
                </Link>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-royal-700/30 text-royal-300 text-lg font-extralight mb-4">
                    {session.code}
                  </span>
                  <h1 className="font-display text-3xl md:text-4xl font-medium text-white mb-2">
                    {t("results.title")}: {session.name}
                  </h1>
                  <p className="text-lg font-extralight text-white/60">
                    {votes.length} {t("results.votesRegistered")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-lg bg-surface-300 text-white text-lg font-extralight flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t("results.exportBtn")}
                    Export

                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-lg bg-royal-700 text-white text-lg font-extralight flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {t("results.shareBtn")}
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Vote className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">{votes.length}</p>
                      <p className="text-lg font-extralight text-white/60">{t("results.totalVotes")}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-royal-700/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-royal-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-display font-medium text-white">
                        {candidateResults.length}
                      </p>
                      <p className="text-lg font-extralight text-white/60">{t("results.candidatesLabel")}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-xl font-display font-medium text-white truncate">
                        {candidateResults[0]?.name || "—"}
                      </p>
                      <p className="text-lg font-extralight text-white/60">{t("results.winner")}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-display text-xl font-medium text-white mb-6">
                    {t("results.perCandidate")}
                  </h3>
                  <div className="space-y-4">
                    {candidateResults.map((result, idx) => (
                      <div key={result.id} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium ${
                                idx === 0
                                  ? "bg-gold-500 text-surface-900"
                                  : "bg-surface-300 text-white"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="text-lg font-extralight text-white">{result.name}</span>
                          </div>
                          <span className="text-lg font-extralight text-white/60">
                            {result.votes} {t("results.votesLabel")} ({result.percentage}%)
                          </span>
                        </div>
                        <div className="h-3 bg-surface-300 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.percentage}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-display text-xl font-medium text-white mb-6">
                    {t("results.distribution")}
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={candidateResults}
                          dataKey="votes"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percentage }) => `${name.split(" ")[0]} (${percentage}%)`}
                        >
                          {candidateResults.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a2234",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-display text-xl font-medium text-white mb-6">
                    {t("results.genderDist")}
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={demographicData.gender}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {demographicData.gender.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a2234",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px"
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-surface-400/50 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="font-display text-xl font-medium text-white mb-6">
                    {t("results.ageDist")}
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={demographicData.age}>
                        <XAxis dataKey="age" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a2234",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="votes" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

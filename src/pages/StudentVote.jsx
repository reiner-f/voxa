import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/CandidateCard";
import StampAnimation from "../components/StampAnimation";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import BrandWatermark from "../components/BrandWatermark";
import { mockCandidates, mockSessions } from "../data/mockData";

export default function StudentVote() {
  const [session, setSession] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [voteComplete, setVoteComplete] = useState(false);
  const { t } = useLanguage();
  const { studentSession, logoutStudent } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentSession) {
      navigate("/student/join");
      return;
    }

    const sessions = JSON.parse(localStorage.getItem("voxSessions") || JSON.stringify(mockSessions));
    const currentSession = sessions.find((s) => s.code === studentSession.sessionCode);
    if (currentSession) {
      setSession(currentSession);
      const sessionCandidates = mockCandidates.filter((c) =>
        currentSession.candidates.includes(c.id)
      );
      setCandidates(sessionCandidates);

      const votes = JSON.parse(localStorage.getItem("voxVotes") || "[]");
      const existingVote = votes.find(
        (v) => v.sessionId === currentSession.id && v.visitorId === getVisitorId()
      );
      if (existingVote) {
        setHasVoted(true);
        setVoteComplete(true);
      }
    }
  }, [studentSession, navigate]);

  const getVisitorId = () => {
    let id = localStorage.getItem("voxVisitorId");
    if (!id) {
      id = `visitor-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      localStorage.setItem("voxVisitorId", id);
    }
    return id;
  };

  const handleVote = () => {
    if (!selectedCandidate || !session) return;

    const vote = {
      id: `vote-${Date.now()}`,
      sessionId: session.id,
      candidateId: selectedCandidate.id,
      visitorId: getVisitorId(),
      timestamp: new Date().toISOString(),
      demographics: {
        gender: ["M", "F"][Math.floor(Math.random() * 2)],
        age: [15, 16, 17, 18][Math.floor(Math.random() * 4)]
      }
    };

    const votes = JSON.parse(localStorage.getItem("voxVotes") || "[]");
    votes.push(vote);
    localStorage.setItem("voxVotes", JSON.stringify(votes));

    const badges = JSON.parse(localStorage.getItem("voxBadges") || "[]");
    if (!badges.includes("first-vote")) {
      badges.push("first-vote");
      localStorage.setItem("voxBadges", JSON.stringify(badges));
    }

    setShowStamp(true);
    setHasVoted(true);
  };

  const handleStampComplete = () => {
    setShowStamp(false);
    setVoteComplete(true);
  };

  const handleLeaveSession = () => {
    logoutStudent();
    navigate("/student/join");
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-surface-500 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div id="student-vote-page" className="min-h-screen bg-surface-500 relative">
      <BrandWatermark size="lg" position="bottom-right" />
      <Navbar />

      <StampAnimation show={showStamp} onComplete={handleStampComplete} />

      <div className="pt-24 pb-16">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <button
                onClick={handleLeaveSession}
                className="flex items-center gap-2 text-lg font-extralight text-white/60 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("student.leaveSession")}
              </button>

              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 rounded-full bg-royal-700/30 text-royal-300 text-lg font-extralight mb-4">
                  {session.code}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-medium text-white mb-3">
                  {session.name}
                </h1>
                <p className="text-xl font-extralight text-white/60">
                  {voteComplete ? t("student.thankYou") : t("student.selectCandidate")}
                </p>
              </div>

              {voteComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-lg mx-auto text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="font-display text-2xl font-medium text-white mb-4">
                    {t("student.voteSubmitted")}
                  </h2>
                  <p className="text-lg font-extralight text-white/60 mb-8">
                    {t("student.voteRecorded")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={`/results/${session.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-royal-700 to-royal-600 text-white font-display font-medium text-lg"
                      >
                        {t("student.viewResults")}
                      </motion.button>
                    </Link>
                    <Link to="/education">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-xl border border-gold-400 text-gold-400 font-display font-medium text-lg"
                      >
                        {t("student.backToEducation")}
                      </motion.button>
                    </Link>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-lg font-extralight text-white/40 mb-4">
                      {t("student.canReturn")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 rounded-xl bg-surface-300 text-white text-lg font-extralight hover:bg-surface-200 transition-colors"
                      >
                        {t("student.homePage")}
                      </button>
                      <button
                        onClick={() => navigate("/student/join")}
                        className="px-6 py-3 rounded-xl bg-surface-300 text-white text-lg font-extralight hover:bg-surface-200 transition-colors"
                      >
                        {t("student.otherSession")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {candidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        selected={selectedCandidate?.id === candidate.id}
                        onSelect={setSelectedCandidate}
                        showVoteButton
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedCandidate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-0 left-0 right-0 bg-surface-400/95 backdrop-blur-lg border-t border-white/10 p-6"
                      >
                        <div className="max-w-[2400px] mx-auto">
                          <div className="grid grid-cols-12">
                            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={selectedCandidate.avatar}
                                  alt={selectedCandidate.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-lg font-extralight text-white/60">
                                    {t("student.youSelected")}
                                  </p>
                                  <p className="font-display text-xl font-medium text-white">
                                    {selectedCandidate.name}
                                  </p>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleVote}
                                className="px-10 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-xl shadow-lg shadow-gold-500/30 pulse-glow"
                              >
                                {t("student.confirmVote")} ✓
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
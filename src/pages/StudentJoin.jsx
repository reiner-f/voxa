import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { KeyRound, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function StudentJoin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { joinSession } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = joinSession(code.toUpperCase());
      if (result.success) {
        navigate("/student/vote");
      } else {
        setError(t("student.invalidCode"));
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div id="student-join-page" className="min-h-screen bg-surface-500 relative overflow-hidden">
      <BrandWatermark size="xl" position="center" />
      <Navbar />

      <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-400/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12"
          >
            <div className="text-center mb-10">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gold-500/30"
              >
                <span className="text-4xl">��️</span>
              </motion.div>
              <h1 className="font-display text-3xl md:text-4xl font-medium text-white mb-3">
                {t("student.joinClass")}
              </h1>
              <p className="text-lg font-extralight text-white/60">
                {t("student.enterCodeDesc")}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label className="block text-lg font-extralight text-white/80 mb-3">
                  {t("student.enterCode")}
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full pl-14 pr-4 py-5 rounded-xl bg-surface-300 border border-white/10 text-white text-xl font-mono tracking-wider uppercase placeholder:text-white/30 focus:outline-none focus:border-gold-500 transition-colors text-center"
                    placeholder={t("student.codePlaceholder")}
                    maxLength={12}
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-extralight text-red-400 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!code || loading}
                className="w-full py-5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-xl flex items-center justify-center gap-3 shadow-lg shadow-gold-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-surface-900/30 border-t-surface-900 rounded-full animate-spin" />
                ) : (
                  <>
                    {t("student.join")}
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="bg-royal-700/20 rounded-xl p-6 border border-royal-600/30">
                <h3 className="font-display text-lg font-medium text-royal-300 mb-3 flex items-center gap-2">
                  <span>💡</span> {t("student.howItWorks")}
                </h3>
                <ul className="space-y-2 text-lg font-extralight text-white/60">
                  <li>1. {t("student.step1")}</li>
                  <li>2. {t("student.step2")}</li>
                  <li>3. {t("student.step3")}</li>
                  <li>4. {t("student.step4")}</li>
                </ul>
              </div>

              <p className="text-center text-lg font-extralight text-white/40 mt-6">
                {t("student.demoCode")} <span className="text-gold-400 font-mono">VOX-2026-A1</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

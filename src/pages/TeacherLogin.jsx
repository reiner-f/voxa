import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import BrandWatermark from "../components/BrandWatermark";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { loginTeacher } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = loginTeacher(email, password);
      if (result.success) {
        navigate("/teacher/dashboard");
      } else {
        setError(t("auth.invalidEmail"));
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div id="teacher-login-page" className="min-h-screen bg-surface-500 relative overflow-hidden">
      <BrandWatermark size="xl" position="center" />
      <Navbar />

      <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-400/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-10"
          >
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-medium text-white mb-2">
                {t("auth.teacherLogin")}
              </h1>
              <p className="text-lg font-extralight text-white/60">
                Colegiul National A.T. Laurian, Botosani
              </p>
              <p className="text-lg font-extralight text-gold-400 mt-1">
                {t("auth.coordInfo")}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label className="block text-lg font-extralight text-white/80 mb-2">
                  {t("auth.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-300 border border-white/10 text-white text-lg font-extralight placeholder:text-white/30 focus:outline-none focus:border-royal-500 transition-colors"
                    placeholder="profesor@liceu.ro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-extralight text-white/80 mb-2">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-surface-300 border border-white/10 text-white text-lg font-extralight placeholder:text-white/30 focus:outline-none focus:border-royal-500 transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-royal-700 to-royal-600 text-white font-display font-medium text-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t("auth.login")}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-lg font-extralight text-white/40 mb-4">
                {t("auth.demoInfo")}
              </p>
              <Link
                to="/"
                className="text-lg font-extralight text-gold-400 hover:text-gold-300 transition-colors"
              >
                ← {t("auth.backHome")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Vote,
  BookOpen,
  BarChart3,
  Globe,
  School,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
import { useLanguage } from "../context/LanguageContext";
import BrandWatermark from "../components/BrandWatermark";
import TextLogo from "../components/TextLogo";

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: Vote, title: t("features.voting.title"), desc: t("features.voting.desc") },
    { icon: BookOpen, title: t("features.education.title"), desc: t("features.education.desc") },
    { icon: BarChart3, title: t("features.analytics.title"), desc: t("features.analytics.desc") },
    { icon: Globe, title: t("features.bilingual.title"), desc: t("features.bilingual.desc") }
  ];

  return (
    <div id="home-page" className="min-h-screen bg-surface-500">
      <Navbar />

      <section id="home-hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <BrandWatermark size="xl" position="center" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-900/90 via-surface-500/80 to-surface-500" />
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-royal-700/20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gold-500/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="absolute top-1/4 right-[15%] hidden lg:block">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl opacity-20"
          />
        </div>

        <div className="absolute bottom-1/4 left-[10%] hidden lg:block">
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-24 h-24 bg-gradient-to-br from-royal-500 to-royal-700 rounded-full opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-[2400px] mx-auto w-full pt-32">
          <div className="flex flex-col items-center text-center px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 text-lg font-extralight border border-gold-500/30 mx-auto">
                  Colegiul National A.T. Laurian, Botosani
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-8">
                {t("hero.title").split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className={i === 1 ? "text-gold-400" : ""}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h1>

              <p className="text-xl md:text-2xl font-extralight text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="inline-flex items-center gap-4 mb-8 p-4 rounded-xl bg-surface-400/50 border border-white/10">
                <img
                  src="https://laurian.ro/wp-content/uploads/2018/07/prof-mangar-gabriela-franceza-e1530793659393.jpg"
                  alt="Prof. Mangîr Gabriela"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold-400"
                />
                <div>
                  <p className="text-lg font-extralight text-white/60">{t("team.coordinator")}</p>
                  <p className="font-display text-xl font-medium text-white">Prof. Mangîr Gabriela</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/teacher/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-royal-700 to-royal-600 text-white font-display font-medium text-lg flex items-center justify-center gap-3 shadow-lg shadow-royal-700/30 hover:shadow-xl hover:shadow-royal-700/40 transition-shadow"
                  >
                    <School className="w-5 h-5" />
                    {t("hero.teacherBtn")}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link to="/student/join">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-surface-900 font-display font-medium text-lg flex items-center justify-center gap-3 shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 transition-shadow"
                  >
                    <Vote className="w-5 h-5" />
                    {t("hero.studentBtn")}
                  </motion.button>
                </Link>
              </div>

              <Link
                to="/education"
                className="inline-flex items-center gap-2 mt-8 text-lg font-extralight text-gold-400 hover:text-gold-300 transition-colors justify-center"
              >
                <Sparkles className="w-5 h-5" />
                {t("hero.learnBtn")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-white/50" />
          </motion.div>
        </div>
      </section>

      <section id="home-features" className="py-24 relative overflow-visible">
        <BrandWatermark size="lg" position="top-right" />
        <div className="absolute -top-20 -right-20 w-[50vw] h-[50vw] bg-royal-700/10 rounded-full blur-3xl" />

        <div className="max-w-[2400px] mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6">
                  {t("features.title")}
                </h2>
                <p className="text-xl font-extralight text-white/60 max-w-2xl mx-auto">
                  {t("features.subtitle")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-surface-400/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold-400/30 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-royal-700 to-royal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-8 h-8 text-gold-400" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-lg font-extralight text-white/60 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home-stats" className="py-24 bg-surface-400/30">
        <div className="max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={School}
                  value="42+"
                  label={t("stats.schools")}
                  delay={0}
                />
                <StatCard
                  icon={Users}
                  value="2,847"
                  label={t("stats.students")}
                  delay={0.1}
                />
                <StatCard
                  icon={CheckCircle}
                  value="8,432"
                  label={t("stats.votes")}
                  delay={0.2}
                />
                <StatCard
                  icon={Vote}
                  value="156"
                  label={t("stats.sessions")}
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home-how-it-works" className="py-24 relative overflow-visible">
        <div className="absolute -bottom-40 -left-40 w-[60vw] h-[60vw] bg-gold-500/5 rounded-full blur-3xl" />

        <div className="max-w-[2400px] mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6">
                  {t("howItWorks.title")}
                </h2>
                <p className="text-xl font-extralight text-white/60 max-w-2xl mx-auto">
                  {t("howItWorks.subtitle")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: t("howItWorks.step1.title"),
                    desc: t("howItWorks.step1.desc"),
                    icon: Vote
                  },
                  {
                    step: "02",
                    title: t("howItWorks.step2.title"),
                    desc: t("howItWorks.step2.desc"),
                    icon: Users
                  },
                  {
                    step: "03",
                    title: t("howItWorks.step3.title"),
                    desc: t("howItWorks.step3.desc"),
                    icon: CheckCircle
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center font-display font-bold text-2xl text-surface-900 shadow-lg">
                      {item.step}
                    </div>
                    <div className="bg-surface-300/50 rounded-2xl p-8 pt-16 border border-white/10 h-full">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-700/30 to-royal-600/30 flex items-center justify-center mb-6">
                        <item.icon className="w-7 h-7 text-gold-400" />
                      </div>
                      <h3 className="font-display text-2xl font-medium text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-lg font-extralight text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home-cta" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-800 to-royal-900" />
        <BrandWatermark size="lg" position="center" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-gold-400/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-gold-400/10 rounded-full" />
        </div>

        <div className="max-w-[2400px] mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Vote className="w-16 h-16 text-gold-400 mx-auto mb-8" />
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 max-w-3xl mx-auto">
                  {t("cta.title")}
                </h2>
                <p className="text-xl font-extralight text-white/70 mb-12 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <Link to="/teacher/login">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-surface-900 font-display font-medium text-xl shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 transition-all"
                  >
                    {t("cta.button")}
                    <ArrowRight className="inline-block ml-3 w-6 h-6" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
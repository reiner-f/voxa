import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Badge({ badge, earned = false }) {
  const { language } = useLanguage();

  return (
    <motion.div
      whileHover={earned ? { scale: 1.05, rotate: 2 } : {}}
      className={`relative p-6 rounded-xl border-2 transition-all ${
        earned
          ? "bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-gold-400 shadow-lg shadow-gold-400/20"
          : "bg-surface-400/50 border-white/10 opacity-50 grayscale"
      }`}
    >
      {earned && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
          <span className="text-lg">✓</span>
        </div>
      )}

      <div className="text-center">
        <span className="text-5xl mb-4 block">{badge.icon}</span>
        <h4 className="font-display font-medium text-lg text-white mb-2">
          {badge.name[language]}
        </h4>
        <p className="text-lg font-extralight text-white/60">
          {badge.description[language]}
        </p>
      </div>
    </motion.div>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useLanguage } from "../context/LanguageContext";

export default function StampAnimation({ show, onComplete }) {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#003399", "#fbbf24", "#ffffff", "#f59e0b"]
        });
      }, 400);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#003399", "#fbbf24"]
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#003399", "#fbbf24"]
        });
      }, 600);

      setTimeout(() => {
        onComplete?.();
      }, 2500);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/90 backdrop-blur-md"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 3, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.6
          }}
          className="mb-8"
        >
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-royal-700 to-royal-900 rounded-full flex items-center justify-center border-8 border-gold-400 shadow-2xl shadow-gold-400/30">
            <div className="text-center">
              <span className="text-6xl">✓</span>
              <p className="font-display font-bold text-xl text-gold-400 mt-2">{t("student.stamp.voted")}</p>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-display text-4xl font-medium text-white mb-4"
        >
          {t("student.stamp.voteRegistered")}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl font-extralight text-white/70"
        >
          {t("student.stamp.thanksDemocracy")}
        </motion.p>
      </div>
    </motion.div>
  );
}

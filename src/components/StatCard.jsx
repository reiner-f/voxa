import React from "react";
import { motion } from "motion/react";

export default function StatCard({ icon: Icon, value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-surface-300/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-700 to-royal-600 flex items-center justify-center">
          <Icon className="w-7 h-7 text-gold-400" />
        </div>
        <div>
          <p className="font-display text-3xl font-medium text-white">{value}</p>
          <p className="text-lg font-extralight text-white/60">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

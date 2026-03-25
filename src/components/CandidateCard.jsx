import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function CandidateCard({ candidate, onSelect, selected, showVoteButton = false }) {
  const { language, t } = useLanguage();

  return (
    <motion.div
      id={`candidate-card-${candidate.id}`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(candidate)}
      className={`relative bg-surface-300 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
        selected
          ? "border-gold-400 shadow-lg shadow-gold-400/20"
          : "border-transparent hover:border-royal-600"
      }`}
    >
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 rounded-full bg-surface-500/80 backdrop-blur-sm text-lg font-extralight text-white">
          {candidate.memeStyle}
        </span>
      </div>

      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="font-display font-medium text-xl text-white mb-2">
          {candidate.name}
        </h3>
        <span className="inline-block px-3 py-1 rounded-full bg-royal-700/30 text-royal-300 text-lg font-extralight mb-4">
          {t(`archetypes.${candidate.archetype}`)}
        </span>

        <p className="text-lg font-extralight text-white/70 mb-4 line-clamp-2">
          {candidate.platform[language]}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {candidate.values[language].map((value, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded bg-gold-500/10 text-gold-400 text-lg font-extralight"
            >
              {value}
            </span>
          ))}
        </div>

        {showVoteButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-lg font-display font-medium text-lg transition-all ${
              selected
                ? "bg-gold-500 text-surface-900"
                : "bg-royal-700 text-white hover:bg-royal-600"
            }`}
          >
            {selected ? "✓ " : ""}{t("candidates.voteFor")} {candidate.name.split(" ")[0]}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

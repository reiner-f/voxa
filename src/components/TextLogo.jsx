import React from "react";
import { motion } from "motion/react";

export default function TextLogo({ size = "md", showSubtitle = true }) {
  const sizeConfig = {
    sm: { title: "text-xl", subtitle: "text-lg", gap: "gap-0.5" },
    md: { title: "text-2xl", subtitle: "text-lg", gap: "gap-1" },
    lg: { title: "text-3xl", subtitle: "text-lg", gap: "gap-1" }
  };

  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <div id="text-logo" className={`flex items-center gap-3`}>
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-royal-700 to-royal-800 flex items-center justify-center border border-royal-600/50">
          <span className="font-display font-bold text-xl text-gold-400 leading-none">V</span>
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-0.5 rounded-md bg-gradient-to-br from-gold-400/20 to-royal-600/20 -z-10 blur-sm"
        />
      </div>
      <div className={`flex flex-col ${config.gap}`}>
        <span className={`font-display font-semibold ${config.title} text-white leading-none tracking-tight`}>
          <span className="text-gold-400">Vox</span> Jeunesse
        </span>
        {showSubtitle && (
          <span className={`${config.subtitle} font-extralight text-gold-400/80 leading-none`}>
            C.N. A.T. Laurian
          </span>
        )}
      </div>
    </div>
  );
}

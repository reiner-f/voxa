import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";

export default function BrandWatermark({ size = "lg", position = "center", className = "" }) {
  const sizeMap = {
    sm: "w-[300px] h-[200px] md:w-[500px] md:h-[350px]",
    md: "w-[400px] h-[280px] md:w-[700px] md:h-[500px]",
    lg: "w-[500px] h-[350px] md:w-[900px] md:h-[600px]",
    xl: "w-[600px] h-[420px] md:w-[1100px] md:h-[750px]"
  };

  const positionMap = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-[5%] right-[0%]",
    "bottom-left": "bottom-[5%] left-[0%]",
    "bottom-right": "bottom-[5%] right-[0%]",
    "top-left": "top-[5%] left-[0%]"
  };

  const currentSize = sizeMap[size] || sizeMap.lg;

  return (
    <motion.div
      id="brand-watermark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className={`absolute pointer-events-none select-none z-0 ${positionMap[position] || positionMap.center} ${className}`}
    >
      <div className={`${currentSize} relative overflow-hidden`}>
        <svg
          viewBox="0 0 900 600"
          className="w-full h-full"
          style={{ filter: "saturate(0.4) brightness(0.8)" }}
        >
          <defs>
            <linearGradient id="flagBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003399" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#002266" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#003399" stopOpacity="0.12" />
            </linearGradient>
            <filter id="flagWave">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.003" numOctaves="3" seed="2">
                <animate attributeName="baseFrequency" values="0.015 0.003;0.012 0.005;0.018 0.004;0.015 0.003" dur="8s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="35">
                <animate attributeName="scale" values="35;45;30;35" dur="6s" repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>
            <filter id="shadowGlow">
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.98 0 0 0 0 0.75 0 0 0 0 0.14 0 0 0 0.3 0" />
            </filter>
          </defs>

          <g filter="url(#flagWave)">
            <rect x="0" y="0" width="900" height="600" fill="url(#flagBlue)" rx="4" />

            <motion.g
              animate={{ opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const cx = 450 + Math.cos(angle) * 140;
                const cy = 300 + Math.sin(angle) * 140;
                return (
                  <g key={i}>
                    <polygon
                      points={`${cx},${cy - 18} ${cx + 5},${cy - 6} ${cx + 17},${cy - 6} ${cx + 7},${cy + 2} ${cx + 11},${cy + 15} ${cx},${cy + 8} ${cx - 11},${cy + 15} ${cx - 7},${cy + 2} ${cx - 17},${cy - 6} ${cx - 5},${cy - 6}`}
                      fill="#fbbf24"
                      opacity="0.15"
                    />
                  </g>
                );
              })}
            </motion.g>

            {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
              <motion.line
                key={i}
                x1="0"
                y1={600 * pos}
                x2="900"
                y2={600 * pos}
                stroke="#003399"
                strokeWidth="0.5"
                opacity="0.06"
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </g>
        </svg>

        <motion.div
          animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,51,153,0.08) 0%, transparent 70%)"
          }}
        />
      </div>
    </motion.div>
  );
}

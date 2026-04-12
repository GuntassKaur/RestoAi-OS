"use client";
import { motion } from "framer-motion";

interface InventoryGaugeProps {
  label: string;
  value: number; // current stock
  max: number; // max stock
  unit: string;
  delay?: number;
}

export function InventoryGauge({ label, value, max, unit, delay = 0 }: InventoryGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const isLow = percentage < 25;
  const color = isLow ? "#fb7185" : "#34d399"; // rose-400 : emerald-400

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay }}
      className="flex flex-col items-center gap-3 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-700"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-bold font-mono text-slate-200">{value}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-slate-300">{label}</p>
        <p className="text-xs text-slate-500 font-mono">{unit}</p>
      </div>
    </motion.div>
  );
}

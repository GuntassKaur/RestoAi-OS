"use client";
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  delay?: number;
  color?: "violet" | "emerald" | "blue" | "rose";
}

export function MetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  trend,
  trendLabel,
  delay = 0,
  color = "violet"
}: MetricCardProps) {
  const springValue = useSpring(0, {
    mass: 1,
    stiffness: 70,
    damping: 15,
  });

  const displayValue = useTransform(springValue, (current) => {
    return `${prefix}${current.toFixed(0)}${suffix}`;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      springValue.set(value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, springValue, delay]);

  const colorVariants = {
    violet: "from-violet-500/20 to-violet-500/0 text-violet-400 border-violet-500/20",
    emerald: "from-emerald-500/20 to-emerald-500/0 text-emerald-400 border-emerald-500/20",
    blue: "from-blue-500/20 to-blue-500/0 text-blue-400 border-blue-500/20",
    rose: "from-rose-500/20 to-rose-500/0 text-rose-400 border-rose-500/20",
  };

  const bgGradient = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay }}
      className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className={`p-2 rounded-lg bg-slate-800/50 border border-slate-700`}>
            <Icon className={`w-5 h-5 ${colorVariants[color].split(" ")[1]}`} />
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          <motion.h3 className="text-3xl font-bold text-slate-100 font-mono tracking-tight">
            {displayValue}
          </motion.h3>
        </div>

        {trend !== undefined && (
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            {trendLabel && <span className="text-xs text-slate-500">{trendLabel}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

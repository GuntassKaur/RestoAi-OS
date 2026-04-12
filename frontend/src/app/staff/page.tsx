"use client";
import React from 'react';
import useSWR from 'swr';
import { Users, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:8000/api";
const fetcher = (url: string) => fetch(url).then(res => res.json());

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-700/50 rounded-xl ${className}`} />
);

export default function StaffPage() {
  const { data: staff, isLoading } = useSWR(`${API_BASE}/staff`, fetcher);
  const { data: onDuty } = useSWR(`${API_BASE}/staff/on-duty`, fetcher);

  const isOnDuty = (staffId: number) => {
    return onDuty?.some((s: any) => s.name === staff?.find((st: any) => st.id === staffId)?.name);
  };

  return (
    <div className="min-h-screen pt-16 px-4 md:p-8 md:pt-8 w-full max-w-7xl mx-auto space-y-8 font-sans">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Staff Directory</h1>
          <p className="text-slate-400 font-medium">Shift tracking and operational assignments.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-black text-emerald-400">
           {onDuty?.length || 0} MEMBERS ACTIVE
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          [1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full" />)
        ) : staff?.map((member: any, i: number) => {
          const active = isOnDuty(member.id);
          return (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-lg overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${active ? 'text-blue-400' : 'text-slate-600'}`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[3px] border-[#020617] ${active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{member.name}</h3>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-300 flex items-center gap-2 justify-end font-mono">
                  <Clock className="w-4 h-4 text-blue-500/50" />
                  {active ? "Currently Active" : "Off Duty"}
                </p>
                <div className="mt-2 text-[10px] font-black tracking-widest text-slate-600 uppercase">
                    Verification: <span className="text-blue-400/60">{member.phone || "SECURE"}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}

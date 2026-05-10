"use client";
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Wifi, WifiOff, Terminal } from 'lucide-react';

export default function DebugPage() {
  const [results, setResults] = useState<any[]>([]);
  const [isFixing, setIsFixing] = useState(false);

  const testEndpoints = [
    "http://127.0.0.1:8000/api/inventory",
    "/api/inventory",
    "http://127.0.0.1:8000/api/reports/summary",
  ];

  const runDiagnostics = async () => {
    const newResults = [];
    for (const url of testEndpoints) {
      try {
        const start = Date.now();
        const res = await fetch(url, { mode: 'cors' });
        const time = Date.now() - start;
        newResults.push({ url, status: res.status, time, ok: res.ok, error: null });
      } catch (err: any) {
        newResults.push({ url, status: "FAILED", time: "--", ok: false, error: err.message });
      }
    }
    setResults(newResults);
  };

  useEffect(() => { runDiagnostics(); }, []);

  return (
    <div className="min-h-screen p-8 bg-[#020617] text-white font-mono space-y-8">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <ShieldAlert className="w-10 h-10 text-rose-500" />
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest">DINEVA Diagnostic Console</h1>
          <p className="text-slate-500 text-xs">Connectivity & Neural Link Verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Endpoint Health Scan
          </h2>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border ${r.ok ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 break-all">{r.url}</span>
                  {r.ok ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-black ${r.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{r.status}</span>
                  <span className="text-xs text-slate-500">{r.time}ms</span>
                </div>
                {r.error && <p className="text-[10px] text-rose-300 mt-2 font-bold italic">Err: {r.error}</p>}
              </div>
            ))}
          </div>
          <button 
            onClick={runDiagnostics} 
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
          >
            Re-Scan Neural Network
          </button>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
           <h2 className="text-sm font-bold flex items-center gap-2">
             <Terminal className="w-4 h-4 text-blue-400" /> System Recommendations
           </h2>
           <div className="bg-black/40 p-5 rounded-xl border border-white/5 space-y-4 text-xs leading-relaxed text-slate-400">
              <p>1. <b className="text-white">Verify Python Process:</b> Run <code className="text-blue-400 bg-blue-500/10 px-1 rounded">tasklist | findstr python</code> in your terminal.</p>
              <p>2. <b className="text-white">Port 8000 Conflict:</b> Ensure no other app (like another uvicorn or dev tool) is using port 8000.</p>
              <p>3. <b className="text-white">One-Click Fix:</b> Double click the <code className="text-emerald-400">FIX_DINEVA.bat</code> file in your main folder.</p>
              <p>4. <b className="text-white">Hard Reset:</b> If things are stuck, delete the <code className="text-amber-400">.next</code> folder in frontend and run <code className="text-amber-400">npm run dev</code> again.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

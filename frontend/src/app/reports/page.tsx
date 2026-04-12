"use client";
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { mockRevenueData } from '@/lib/mockData';

const categoryData = [
  { name: 'Food', value: 400 },
  { name: 'Beverages', value: 300 },
  { name: 'Desserts', value: 300 },
  { name: 'Alcohol', value: 200 },
];
const COLORS = ['#3b82f6', '#10b981', '#f43f5e', '#8b5cf6'];

export default function ReportsPage() {
  return (
    <div className="min-h-screen pt-16 px-4 md:p-8 md:pt-8 w-full max-w-7xl mx-auto space-y-8 font-sans">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Analytics</h1>
        <p className="text-blue-200/60 font-medium">Enterprise revenue breakdown & insights.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col"
        >
          <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Revenue Trend (7 Days)</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `$${v}`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" strokeOpacity={0.05} vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{color: '#34d399', fontFamily: 'var(--font-jetbrains)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#colorRevRep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl h-[450px] flex flex-col"
        >
          <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Category Breakdown</h3>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{fontFamily: 'var(--font-jetbrains)'}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">4 Categories</span>
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-5 mt-6">
            {categoryData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-[3px] border-[#020617] shadow-[0_0_0_1px_rgba(255,255,255,0.2)]" style={{ backgroundColor: COLORS[idx] }} />
                <span className="text-sm font-semibold text-slate-300 tracking-wide">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

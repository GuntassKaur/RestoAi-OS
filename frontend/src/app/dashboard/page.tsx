"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  AlertTriangle, 
  Users, 
  RefreshCw, 
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const API_BASE = "/api";
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
});

// --- Components ---

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1000;
    let increment = end / (totalDuration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString('en-IN')}</span>;
};

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-700/50 rounded-xl ${className}`} />
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    received: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    preparing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ready: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    served: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
      {status}
    </span>
  );
};

// --- Page ---

export default function DashboardPage() {
  const { data: summary, error: summaryErr, mutate: mutateSummary } = useSWR(`${API_BASE}/reports/summary`, fetcher, { refreshInterval: 10000 });
  const { data: lowStock, error: stockErr } = useSWR(`${API_BASE}/inventory/alerts`, fetcher);
  const { data: revenueChart, error: chartErr } = useSWR(`${API_BASE}/reports/revenue?days=7`, fetcher);
  const { data: recentOrders, error: ordersErr } = useSWR(`${API_BASE}/orders`, fetcher); // Backend doesn't have limit yet, but we'll slice
  const { data: onDuty, error: dutyErr } = useSWR(`${API_BASE}/staff/on-duty`, fetcher);

  const isLoading = !summary || !lowStock || !revenueChart || !recentOrders || !onDuty;
  const isError = summaryErr || stockErr || chartErr || ordersErr || dutyErr;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 border border-rose-500/20">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Neural Link Failed</h2>
        <p className="text-slate-400 mb-6 max-w-md">We couldn't establish a connection to the DINEVA backend. Please ensure the server is running on port 8000.</p>
        <button 
          onClick={() => { mutateSummary(); window.location.reload(); }}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-400 mt-1 font-medium">Real-time operational awareness for DINEVA OS.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-slate-400">
            SYSTEM STATUS: <span className="text-emerald-400">OPTIMAL</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Today's Revenue</p>
          <h2 className="text-3xl font-bold text-white mt-1 font-mono">
            {isLoading ? <Skeleton className="h-8 w-32" /> : <>₹<AnimatedNumber value={summary.today_revenue} /></>}
          </h2>
        </div>

        {/* Orders */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Today's Orders</p>
          <h2 className="text-3xl font-bold text-white mt-1 font-mono">
            {isLoading ? <Skeleton className="h-8 w-24" /> : <AnimatedNumber value={summary.today_orders} />}
          </h2>
        </div>

        {/* Low Stock */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl border ${summary?.low_stock_count > 0 ? "bg-rose-500/10 border-rose-500/20" : "bg-slate-500/10 border-slate-500/20"}`}>
              <AlertTriangle className={`w-6 h-6 ${summary?.low_stock_count > 0 ? "text-rose-400" : "text-slate-400"}`} />
            </div>
            {summary?.low_stock_count > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md animate-bounce">CRITICAL</span>
            )}
          </div>
          <p className="text-slate-400 text-sm font-medium">Low Stock Alerts</p>
          <h2 className={`text-3xl font-bold mt-1 font-mono ${summary?.low_stock_count > 0 ? "text-rose-400" : "text-white"}`}>
            {isLoading ? <Skeleton className="h-8 w-20" /> : <AnimatedNumber value={summary.low_stock_count} />}
          </h2>
        </div>

        {/* Staff */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20">
              <Users className="w-6 h-6 text-violet-400" />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Staff On Duty</p>
          <h2 className="text-3xl font-bold text-white mt-1 font-mono">
            {isLoading ? <Skeleton className="h-8 w-20" /> : <AnimatedNumber value={onDuty.length} />}
          </h2>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Trend (Last 7 Days)</h3>
            <div className="h-[350px] w-full">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueChart}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => new Date(val).toLocaleDateString('en-IN', { weekday: 'short' })}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                      itemStyle={{ color: '#8B5CF6', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRev)" 
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
              <button className="text-xs font-bold text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[1,2,3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] text-slate-500 text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Table</th>
                      <th className="px-6 py-4">Total Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentOrders.slice(0, 5).map((order: any) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 text-sm font-mono text-blue-400">#{order.id.toString().padStart(4, '0')}</td>
                        <td className="px-6 py-4 text-sm font-medium text-white">Table {order.table_number || '--'}</td>
                        <td className="px-6 py-4 text-sm font-bold text-emerald-400 font-mono">₹{order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          {/* Low Stock Widget */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Inventory Risk</h3>
              <RefreshCw className="w-4 h-4 text-slate-500 cursor-pointer hover:rotate-180 transition-transform duration-500" />
            </div>
            <div className="space-y-6">
              {isLoading ? (
                [1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full" />)
              ) : lowStock.length === 0 ? (
                <p className="text-center text-slate-500 py-8 text-sm">All inventory levels optimized.</p>
              ) : (
                lowStock.slice(0, 5).map((item: any) => {
                  const percentage = (item.quantity / item.reorder_threshold) * 100;
                  return (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-bold text-white">{item.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Threshold: {item.reorder_threshold} {item.unit}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-rose-400">{item.quantity} {item.unit}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          className={`h-full rounded-full ${percentage < 30 ? 'bg-rose-500' : percentage < 60 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Stats / Mini Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <BotIcon />
            <h4 className="text-xl font-bold text-white mb-2 relative z-10">AI Operations Assistant</h4>
            <p className="text-indigo-100/80 text-sm leading-relaxed relative z-10">I can automatically reorder low-stock items or analyze your peak selling hours. Just ask!</p>
            <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold shadow-lg hover:shadow-white/20 transition-all relative z-10">Open Agent Core</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BotIcon() {
  return (
    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 border border-white/30 backdrop-blur-sm relative z-10">
      <RefreshCw className="w-6 h-6 text-white animate-spin-slow" />
    </div>
  );
}

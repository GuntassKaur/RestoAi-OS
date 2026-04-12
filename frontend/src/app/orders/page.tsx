"use client";
import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Hash, 
  User, 
  IndianRupee, 
  ChefHat, 
  PackageCheck, 
  Timer,
  X,
  PlusCircle,
  Trash2,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = "http://localhost:8000/api";
const WS_URL = "ws://localhost:8000/ws/orders";
const fetcher = (url: string) => fetch(url).then(res => res.json());

// --- Stage Config ---
const STAGES = [
  { id: 'received', label: 'Received', color: 'blue' },
  { id: 'preparing', label: 'Preparing', color: 'amber' },
  { id: 'ready', label: 'Ready', color: 'purple' },
  { id: 'served', label: 'Served', color: 'emerald' },
];

const NEXT_STAGE: Record<string, string> = {
  received: 'preparing',
  preparing: 'ready',
  ready: 'served'
};

// --- Components ---

const OrderCard = ({ order, onMove }: { order: any, onMove: (id: number, next: string) => void }) => {
  const ageMinutes = Math.floor((new Date().getTime() - new Date(order.created_at).getTime()) / 60000);
  
  const isOverdue = 
    (order.status === 'preparing' && ageMinutes > 20) || 
    (order.status === 'received' && ageMinutes > 10);
  
  const isCritical = order.status === 'preparing' && ageMinutes > 20;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-panel p-4 rounded-xl border-2 transition-all ${
        isCritical ? 'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 
        isOverdue ? 'border-amber-500/50' : 'border-white/10'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-white font-black flex items-center gap-1.5">
            <Hash className="w-3 h-3 text-blue-400" /> {order.id.toString().padStart(4, '0')}
          </h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Table {order.table_number}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md">
           <Clock className="w-3 h-3" /> {ageMinutes}m ago
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-slate-300 font-medium line-clamp-2">
          {order.items.map((i: any) => `${i.qty}x ${i.item_name}`).join(', ')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-emerald-400 font-bold font-mono text-sm">₹{order.total}</span>
          {isOverdue && (
             <span className="text-[8px] font-black text-rose-500 animate-pulse tracking-tighter">OVERDUE</span>
          )}
        </div>
      </div>

      {order.status !== 'served' && (
        <button 
          onClick={() => onMove(order.id, NEXT_STAGE[order.status])}
          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
        >
          {order.status === 'ready' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-blue-400" />}
          Move to {NEXT_STAGE[order.status]}
        </button>
      )}
    </motion.div>
  );
};

export default function OrdersPage() {
  const { data: orders, mutate } = useSWR(`${API_BASE}/orders`, fetcher, { refreshInterval: 5000 });
  const { data: summary } = useSWR(`${API_BASE}/reports/summary`, fetcher, { refreshInterval: 5000 });
  
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStage, setActiveStage] = useState('received'); // Mobile only
  const [newOrder, setNewOrder] = useState({ table_number: 1, items: [{ item_name: '', qty: 1, price: 0 }] });

  // --- WebSocket ---
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => setIsWsConnected(true);
    ws.onclose = () => setIsWsConnected(false);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_ORDER' || data.type === 'STATUS_UPDATE') {
        mutate();
      }
    };
    return () => ws.close();
  }, [mutate]);

  const handleMove = async (id: number, nextStatus: string) => {
    try {
      await fetch(`${API_BASE}/orders/${id}/status?status=${nextStatus}`, { method: 'PUT' });
      mutate();
    } catch (e) {}
  };

  const handleAddRow = () => {
    setNewOrder(prev => ({ ...prev, items: [...prev.items, { item_name: '', qty: 1, price: 0 }] }));
  };

  const handleRemoveRow = (idx: number) => {
    setNewOrder(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      setIsModalOpen(false);
      setNewOrder({ table_number: 1, items: [{ item_name: '', qty: 1, price: 0 }] });
      mutate();
    } catch (e) {}
  };

  const totalNewOrder = newOrder.items.reduce((sum, i) => sum + (i.price * i.qty), 0);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 bg-slate-950/50">
      
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-4xl font-extrabold text-white tracking-tighter">Kitchen Pipeline</h1>
             <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/5 rounded-full">
                <div className={`w-2 h-2 rounded-full ${isWsConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isWsConnected ? 'Live' : 'Offline'}</span>
             </div>
          </div>
          <p className="text-slate-400 font-medium">Real-time order synchronization & dispatch engine.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs border border-blue-400/30 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> NEW KITCHEN ORDER
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: summary?.today_orders || 0, icon: Timer, color: 'blue' },
          { label: 'Avg Prep Today', value: '14m', icon: ChefHat, color: 'amber' },
          { label: 'Daily Revenue', value: `₹${summary?.today_revenue || 0}`, icon: IndianRupee, color: 'emerald' },
          { label: 'Served Today', value: '42', icon: PackageCheck, color: 'purple' },
        ].map((s, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl flex items-center gap-4 border border-white/5">
            <div className={`p-2.5 bg-${s.color}-500/10 rounded-xl border border-${s.color}-500/20`}>
              <s.icon className={`w-5 h-5 text-${s.color}-400`} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
              <h3 className="text-xl font-bold text-white font-mono">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Stage Switcher */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 custom-scrollbar">
        {STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              activeStage === s.id 
                ? `bg-${s.color}-500/20 border-${s.color}-500/40 text-${s.color}-400` 
                : 'bg-white/5 border-white/10 text-slate-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAGES.map((stage) => {
          const stageOrders = orders?.filter((o: any) => o.status === stage.id) || [];
          return (
            <div 
              key={stage.id} 
              className={`flex flex-col gap-4 ${activeStage !== stage.id ? 'hidden lg:flex' : 'flex'}`}
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stage.label}</h3>
                  <span className="px-1.5 py-0.5 bg-white/5 rounded-md text-[10px] font-mono font-bold text-slate-500">{stageOrders.length}</span>
                </div>
                <div className={`h-1 flex-1 ml-4 rounded-full bg-${stage.color}-500/20`} />
              </div>
              
              <div className="flex-1 space-y-4 bg-white/[0.02] rounded-3xl p-3 border border-dashed border-white/5 min-h-[400px]">
                <AnimatePresence>
                  {stageOrders.length > 0 ? (
                    stageOrders.map((order: any) => (
                      <OrderCard key={order.id} order={order} onMove={handleMove} />
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 py-20 grayscale">
                       <ChefHat className="w-12 h-12 mb-2" />
                       <p className="text-[10px] font-black uppercase">No Orders</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-[#020617] border border-white/10 rounded-[2.5rem] p-8 z-[110] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-400" /> New Kitchen Order
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500"><X /></button>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Table Assignment</label>
                  <input 
                    type="number" 
                    value={newOrder.table_number} 
                    onChange={(e) => setNewOrder({...newOrder, table_number: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white mt-1 focus:outline-none focus:border-blue-500/50" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order Items</label>
                    <button type="button" onClick={handleAddRow} className="text-[10px] font-black text-blue-400 flex items-center gap-1 hover:text-blue-300">
                      <PlusCircle className="w-3 h-3" /> ADD LINE ITEM
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {newOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input 
                          placeholder="Item Name" 
                          value={item.item_name}
                          onChange={(e) => {
                            const items = [...newOrder.items];
                            items[idx].item_name = e.target.value;
                            setNewOrder({...newOrder, items});
                          }}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white" 
                        />
                        <input 
                          type="number" 
                          placeholder="Qty" 
                          value={item.qty}
                          onChange={(e) => {
                            const items = [...newOrder.items];
                            items[idx].qty = parseInt(e.target.value);
                            setNewOrder({...newOrder, items});
                          }}
                          className="w-16 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white" 
                        />
                        <input 
                          type="number" 
                          placeholder="Price" 
                          value={item.price}
                          onChange={(e) => {
                            const items = [...newOrder.items];
                            items[idx].price = parseFloat(e.target.value);
                            setNewOrder({...newOrder, items});
                          }}
                          className="w-24 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-emerald-400 font-mono" 
                        />
                        <button type="button" onClick={() => handleRemoveRow(idx)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                   <div className="flex justify-between items-center px-4 py-4 bg-white/5 rounded-2xl mb-6">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Calculated Total</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">₹{totalNewOrder}</span>
                   </div>
                   <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-3xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] transition-all">
                      FINALIZE & DISPATCH TO KITCHEN
                   </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

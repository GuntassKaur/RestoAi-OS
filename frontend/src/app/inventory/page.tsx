"use client";
import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { 
  Search, 
  Plus, 
  Filter, 
  Box, 
  AlertTriangle, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  ChevronDown, 
  Download,
  Loader2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Toaster";

const API_BASE = "http://localhost:8000/api";
const fetcher = (url: string) => fetch(url).then(res => res.json());

// --- Helper: Status logic ---
const getStatus = (qty: number, threshold: number) => {
  if (qty === 0) return { label: 'Out of Stock', color: 'rose', pulsing: false };
  if (qty <= threshold) return { label: 'Low Stock', color: 'amber', pulsing: true };
  return { label: 'In Stock', color: 'emerald', pulsing: false };
};

export default function InventoryPage() {
  const { data: inventory, mutate, isLoading } = useSWR(`${API_BASE}/inventory`, fetcher, { refreshInterval: 15000 });
  const { toast } = useToast();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    if (!inventory) return [];
    return inventory.filter((item: any) => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = filterCategory === "All" || item.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [inventory, searchTerm, filterCategory]);

  const categories = ["All", "Produce", "Meat", "Dairy", "Dry", "Beverage", "Vegetables", "Grains", "Pantry", "Spices"];

  // --- Handlers ---

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // Convert types
    const cleanPayload = {
      ...payload,
      quantity: parseFloat(payload.quantity as string),
      reorder_threshold: parseFloat(payload.reorder_threshold as string),
      cost_per_unit: parseFloat(payload.cost_per_unit as string),
    };

    try {
      const res = await fetch(`${API_BASE}/inventory/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanPayload)
      });
      if (!res.ok) throw new Error();
      toast("Item added to neural database", "success");
      setIsModalOpen(false);
      mutate();
    } catch (err) {
      toast("Sync error: Failed to add item", "error");
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditBuffer({ ...item });
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    // Optimistic Update
    const oldData = inventory;
    const newData = inventory.map((i: any) => i.id === editingId ? editBuffer : i);
    mutate(newData, false);

    try {
      const res = await fetch(`${API_BASE}/inventory/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBuffer)
      });
      if (!res.ok) throw new Error();
      toast("Neural entry updated", "success");
      setEditingId(null);
    } catch (err) {
      toast("Rollback: Update failed", "error");
      mutate(oldData); // Rollback
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Permanently delete ${item.name}? This path is irreversible.`)) return;
    try {
      const res = await fetch(`${API_BASE}/inventory/${item.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast(`${item.name} purged from system`, "info");
      mutate();
    } catch (err) {
      toast("Purge failed", "error");
    }
  };

  const exportCSV = () => {
    if (!filteredData.length) return;
    const headers = "Name,Category,Quantity,Unit,Supplier\n";
    const csvContent = "data:text/csv;charset=utf-8," + headers + filteredData.map((e: any) => `${e.name},${e.category},${e.quantity},${e.unit},${e.supplier_name}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "restoai_inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lowStockCount = inventory?.filter((i: any) => i.quantity <= i.reorder_threshold).length || 0;

  return (
    <div className="min-h-screen pt-16 px-4 md:p-8 md:pt-8 w-full max-w-[1600px] mx-auto space-y-6 font-sans">
      
      {/* ⚠ Low Stock Alert Banner */}
      <AnimatePresence>
        {lowStockCount > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-between group overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
              </div>
              <div>
                <span className="text-rose-400 font-bold tracking-tight">System Alert:</span>
                <span className="text-rose-200/70 ml-2 font-medium">{lowStockCount} items are below critical safety levels.</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-xs font-black text-rose-400 hover:text-rose-300 transition-colors bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-500/20">
              OPTIMIZE NOW <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-4 underline-offset-8">Neural Inventory</h1>
          <p className="text-slate-400 font-medium tracking-tight">Asynchronous supply-chain synchronization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg backdrop-blur-md text-xs font-bold">
            <Download className="w-4 h-4" /> EXPORT CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] font-black text-xs border border-blue-400/30">
            <Plus className="w-4 h-4" /> ADD NEURAL ITEM
          </button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[2rem] overflow-hidden border border-white/10 bg-[#020617]/40 shadow-2xl">
        {/* Filters and Search */}
        <div className="p-5 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by SKU mapping or ingredient name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-white/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative group w-full md:w-48">
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm text-slate-300 appearance-none focus:outline-none cursor-pointer group-hover:bg-white/10 transition-all"
                >
                  {categories.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
             </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-[10px] uppercase bg-white/[0.01] text-slate-500 tracking-[0.2em] font-black border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Ingredient Entity</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Quantity (Metric)</th>
                <th className="px-6 py-5">Sync Status</th>
                <th className="px-6 py-5">Supplier Vector</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                [1,2,3,4,5,6].map(i => <tr key={i}><td colSpan={6} className="px-8 py-6"><div className="h-12 w-full bg-white/5 animate-pulse rounded-xl" /></td></tr>)
              ) : filteredData.map((item: any, idx: number) => {
                const isEditing = editingId === item.id;
                const status = getStatus(item.quantity, item.reorder_threshold);
                
                return (
                  <motion.tr 
                    key={item.id} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${status.color === 'rose' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-white/5 border-white/10 text-slate-400 group-hover:border-blue-500/20'}`}>
                          <Box className="w-6 h-6"/>
                        </div>
                        {isEditing ? (
                          <input 
                            value={editBuffer.name}
                            onChange={(e) => setEditBuffer({...editBuffer, name: e.target.value})}
                            className="bg-white/10 border border-blue-500/50 rounded-lg px-2 py-1 text-white focus:outline-none"
                          />
                        ) : (
                          <div>
                            <div className="font-bold text-white text-base tracking-tight">{item.name}</div>
                            <div className="text-[10px] text-slate-600 font-mono">ID: {item.id.toString().padStart(4, '0')}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {isEditing ? (
                        <select 
                          value={editBuffer.category}
                          onChange={(e) => setEditBuffer({...editBuffer, category: e.target.value})}
                          className="bg-white/10 border border-blue-500/50 rounded-lg px-2 py-1 text-white"
                        >
                          {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">{item.category}</span>
                      )}
                    </td>
                    <td className="px-6 py-6">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            value={editBuffer.quantity}
                            onChange={(e) => setEditBuffer({...editBuffer, quantity: parseFloat(e.target.value)})}
                            className="bg-white/10 border border-blue-500/50 rounded-lg w-20 px-2 py-1 text-white"
                          />
                          <span className="text-xs text-slate-500">{item.unit}</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1 font-mono">
                          <span className={`text-lg font-bold ${status.color === 'rose' ? 'text-rose-400' : 'text-white'}`}>{item.quantity}</span>
                          <span className="text-xs text-slate-500 font-sans">{item.unit}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-6 font-mono">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black border ${
                        status.color === 'rose' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                        status.color === 'amber' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        {status.pulsing && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
                        {status.label.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-tighter">{item.supplier_name || 'RestoAI Direct'}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isEditing ? (
                             <>
                               <button onClick={handleSaveEdit} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
                                 {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                               </button>
                               <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all">
                                 <X className="w-4 h-4" />
                               </button>
                             </>
                          ) : (
                             <>
                               <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-slate-500 hover:text-blue-400 transition-all">
                                 <Edit2 className="w-4 h-4" />
                               </button>
                               <button onClick={() => handleDelete(item)} className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-all">
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             </>
                          )}
                       </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* --- ADD ITEM SLIDE-IN MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#020617]/95 border-l border-white/10 shadow-2xl z-[70] flex flex-col p-8 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Box className="w-6 h-6 text-blue-500" /> Initialize New Entity
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-6 flex-1 overflow-y-auto pr-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ingredient Name</label>
                  <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500/50" placeholder="e.g. Saffron Strings" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                     <select name="category" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none">
                       {categories.slice(1).map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unit</label>
                     <input required name="unit" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none" placeholder="kg, L, Units" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Quantity</label>
                     <input required type="number" step="0.1" name="quantity" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reorder Threshold</label>
                     <input required type="number" step="0.1" name="reorder_threshold" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-blue-400 focus:outline-none border-blue-500/20" />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cost Per Unit (₹)</label>
                  <input required type="number" step="0.01" name="cost_per_unit" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-emerald-400 focus:outline-none font-mono" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Supplier Name</label>
                  <input name="supplier_name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none" placeholder="Primary Vendor" />
                </div>

                <div className="pt-8">
                  <button type="submit" className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-[2rem] shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all">
                    COMMIT TO INVENTORY
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

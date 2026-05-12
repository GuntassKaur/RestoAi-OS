"use client";

import { useState } from "react";
import { 
  LogOut, 
  Clock, 
  ChevronRight, 
  Search,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  ChefHat,
  UtensilsCrossed,
  BarChart3,
  TrendingUp,
  Package,
  Bell,
  ArrowUpRight,
  TrendingDown,
  History
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Mock data for restaurant metrics
  const stats = [
    { label: "Today's Revenue", value: "₹42,890", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Active Orders", value: "18", change: "+4", trend: "up", icon: UtensilsCrossed, color: "text-blue-400" },
    { label: "Inventory Alerts", value: "3", change: "Critical", trend: "down", icon: Package, color: "text-orange-400" },
    { label: "Staff on Duty", value: "12", change: "Full Team", trend: "up", icon: Users, color: "text-violet-400" },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] flex text-slate-50 font-sans selection:bg-[#4169E1]/30 selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4169E1] to-[#7B68EE] flex items-center justify-center font-bold text-white shadow-lg shadow-[#4169E1]/20 mr-3">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-white tracking-tight text-xl">DinevaAI <span className="text-[#4169E1]">OS</span></span>
        </div>

        <div className="flex-1 py-8 px-4 space-y-2">
          <SidebarLink icon={<LayoutDashboard size={18} />} label="Overview" active />
          <SidebarLink icon={<UtensilsCrossed size={18} />} label="Live Orders" />
          <SidebarLink icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarLink icon={<Package size={18} />} label="Inventory" />
          <SidebarLink icon={<Users size={18} />} label="Staffing" />
          <div className="pt-4 mt-4 border-t border-white/5">
            <SidebarLink icon={<Sparkles size={18} />} label="AI Predictions" />
            <SidebarLink icon={<History size={18} />} label="Order History" />
          </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <SidebarLink icon={<Settings size={18} />} label="Settings" />
          <div className="mt-6 flex items-center justify-between px-3">
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Guntass Kaur</p>
              <p className="text-[10px] text-slate-500 truncate uppercase font-bold tracking-wider">Premium Admin</p>
            </div>
            <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070b14]">
        
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 bg-[#070b14]/50 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="text-left">
            <h1 className="text-xl font-bold text-white">Neural Dashboard</h1>
            <p className="text-xs text-slate-500">Sunday, 11 May 2026</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search orders, staff, analytics..." 
                className="w-80 h-10 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#4169E1]/50 transition-all"
              />
            </div>
            <button className="relative p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#070b14]" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <stat.icon size={64} />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-black text-white">{stat.value}</h2>
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change} {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              
              {/* Live Order Queue */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-[#4169E1]" /> Live Order Queue
                  </h3>
                  <button className="text-xs font-bold text-[#4169E1] hover:underline">View All Orders</button>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((order) => (
                    <div key={order} className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/5 hover:bg-white/[0.02] transition-colors flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-6">
                         <div className="w-14 h-14 rounded-2xl bg-white/5 flex flex-col items-center justify-center border border-white/5 group-hover:border-[#4169E1]/20 transition-all">
                           <span className="text-xs text-slate-500 font-bold uppercase">Table</span>
                           <span className="text-xl font-black text-white">0{order}</span>
                         </div>
                         <div className="text-left">
                           <div className="flex items-center gap-3 mb-1">
                             <h4 className="text-base font-bold text-white">Order #120{order}</h4>
                             <span className="px-2 py-0.5 rounded-full bg-[#4169E1]/10 border border-[#4169E1]/20 text-[10px] font-bold text-[#4169E1] uppercase">Preparing</span>
                           </div>
                           <p className="text-xs text-slate-400">2x Grilled Salmon, 1x Caesar Salad, 3x Draft Beer</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-lg font-black text-white">₹2,450</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 justify-end">
                           <Clock size={10} /> 14m elapsed
                         </p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights & Alerts */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#7B68EE]" /> AI Insights
                </h3>
                
                <div className="space-y-4 text-left">
                  <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 border border-[#7B68EE]/20 bg-gradient-to-br from-[#7B68EE]/5 to-transparent relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 text-[#7B68EE] opacity-20">
                       <TrendingUp size={40} />
                     </div>
                     <h4 className="text-sm font-bold text-white mb-2">Demand Spike Predicted</h4>
                     <p className="text-xs text-slate-400 leading-relaxed mb-4">
                       DinevaAI predicts a 40% surge in dinner bookings for tonight based on local events and historical trends.
                     </p>
                     <button className="text-[10px] font-bold uppercase tracking-widest text-[#7B68EE] hover:underline">Adjust Staffing →</button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 border border-orange-400/20 bg-gradient-to-br from-orange-400/5 to-transparent relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 text-orange-400 opacity-20">
                       <Package size={40} />
                     </div>
                     <h4 className="text-sm font-bold text-white mb-2">Stock Critical Alert</h4>
                     <p className="text-xs text-slate-400 leading-relaxed mb-4">
                       Premium Wagyu Beef and Chilean Sea Bass are below safety thresholds.
                     </p>
                     <button className="text-[10px] font-bold uppercase tracking-widest text-orange-400 hover:underline">Auto-Reorder Now →</button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                          <ChefHat size={20} />
                       </div>
                       <div>
                          <h5 className="text-xs font-bold text-white">Chef Performance</h5>
                          <p className="text-[10px] text-slate-500">Efficiency up 8%</p>
                       </div>
                     </div>
                     <ChevronRight size={16} className="text-slate-600 group-hover:text-white" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      <span className={active ? 'text-white' : 'text-slate-500'}>{icon}</span>
      {label}
    </button>
  );
}

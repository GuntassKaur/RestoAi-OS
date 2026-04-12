"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, PieChart, Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/staff', label: 'Staff', icon: Users },
  { href: '/reports', label: 'Reports', icon: PieChart },
  { href: '/ai-agent', label: 'AI Agent', icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/20">
          R
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">
          Resto<span className="text-blue-400 font-mono">AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group cursor-pointer font-medium text-sm border",
                  isActive
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border-transparent"
                )}
              >
                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-blue-400")} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        <div className="flex items-center gap-3 mb-2 relative">
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RestoManager" alt="User" className="w-10 h-10 rounded-full bg-white/10 border border-white/20" />
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020617]" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-wide">Alex Admin</p>
            <p className="text-xs text-blue-200/60 font-mono">Ops Manager</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-2xl border-r border-white/10 p-5 z-40">
        <NavContent />
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full bg-[#020617]/95 border-r border-white/10 p-5 flex flex-col z-50">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}

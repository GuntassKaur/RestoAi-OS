"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Users, 
  UtensilsCrossed,
  TrendingUp,
  Play,
  Menu,
  X,
  Lock,
  Mail,
  User,
  Clock
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, 
  Area, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ReactLenis } from '@studio-freight/react-lenis';

const data = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 198 },
  { name: 'Wed', revenue: 2000, orders: 980 },
  { name: 'Thu', revenue: 2780, orders: 390 },
  { name: 'Fri', revenue: 1890, orders: 480 },
  { name: 'Sat', revenue: 2390, orders: 380 },
  { name: 'Sun', revenue: 3490, orders: 430 },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#070b14] selection:bg-[#4169E1]/30 selection:text-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl shadow-[#4169E1]/10">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4169E1] to-[#7B68EE] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#4169E1]/20">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">DinevaAI <span className="text-[#4169E1]">OS</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                <Link key={item} href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => { setIsLogin(true); setIsLoginModalOpen(true); }}
                className="text-sm font-semibold text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                Sign in
              </button>
              <button 
                onClick={() => { setIsLogin(false); setIsLoginModalOpen(true); }}
                className="text-sm font-semibold bg-white text-black px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-all shadow-lg"
              >
                Start Free Trial
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-20 left-6 right-6 bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 md:hidden shadow-2xl"
              >
                <div className="flex flex-col gap-4">
                  {['Product', 'Solutions', 'Pricing', 'Resources'].map((item) => (
                    <Link key={item} href="#" className="text-lg font-medium text-slate-300">
                      {item}
                    </Link>
                  ))}
                  <div className="h-px bg-white/10 my-2" />
                  <button 
                    onClick={() => { setIsLogin(true); setIsLoginModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full text-left text-lg font-medium text-white"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => { setIsLogin(false); setIsLoginModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full bg-white text-black py-3 rounded-xl font-bold mt-2"
                  >
                    Start Free Trial
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#4169E1] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Next-Gen Restaurant Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.95]"
            >
              Run Your Restaurant <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4169E1] via-[#7B68EE] to-[#6366F1]">with AI Precision.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Manage orders, analytics, inventory, staff, and customer experience from one intelligent operating system designed for modern hospitality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <button 
                onClick={() => { setIsLogin(false); setIsLoginModalOpen(true); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4169E1] text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-600 transition-all shadow-xl shadow-[#4169E1]/20"
              >
                Get Started for Free <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all border border-white/10">
                <Play size={20} className="fill-white" /> Watch Demo
              </button>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative max-w-6xl mx-auto group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4169E1] to-[#7B68EE] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/20 p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-8 bg-slate-950/50 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">Revenue Growth</h3>
                        <p className="text-sm text-slate-400">Weekly performance metrics</p>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                           <TrendingUp size={16} /> +12.5%
                         </div>
                      </div>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4169E1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#4169E1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Tooltip 
                            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#4169E1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                    <div className="flex-1 bg-slate-950/50 rounded-2xl p-6 border border-white/5 text-left">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                          <UtensilsCrossed size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Live Orders</p>
                          <p className="text-2xl font-black text-white">124</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#4169E1]" />
                              <span className="text-xs text-slate-300">Table #0{i} - Preparing</span>
                            </div>
                            <span className="text-xs text-slate-500">{i}m ago</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-950/50 rounded-2xl p-6 border border-white/5 text-left">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Inventory</p>
                          <p className="text-2xl font-black text-white">Optimal</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Stock Level</span>
                        <span>82%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-[82%] h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Built for the Modern Restaurant</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Everything you need to automate workflows and optimize your dining experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Sparkles className="text-blue-400" />}
                title="AI Insights"
                description="Predictive analytics to forecast demand, optimize staffing, and reduce waste."
              />
              <FeatureCard 
                icon={<Zap className="text-orange-400" />}
                title="Smart Inventory"
                description="Real-time tracking with automated reordering for low-stock essentials."
              />
              <FeatureCard 
                icon={<BarChart3 className="text-emerald-400" />}
                title="Revenue Dashboard"
                description="Instant financial snapshots and multi-location performance reporting."
              />
              <FeatureCard 
                icon={<Users className="text-violet-400" />}
                title="Staff Management"
                description="Intelligent scheduling and performance tracking for your entire team."
              />
              <FeatureCard 
                icon={<UtensilsCrossed className="text-pink-400" />}
                title="Digital Menus"
                description="Dynamic menus that update in real-time based on inventory and peak hours."
              />
              <FeatureCard 
                icon={<ShieldCheck className="text-cyan-400" />}
                title="Secure Operations"
                description="Enterprise-grade security protecting your customer data and financial records."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 text-center border border-white/10 relative z-10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4169E1]/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7B68EE]/20 blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Transform your restaurant today.</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Join 1,000+ restaurants scaling with DinevaAI OS intelligence.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => { setIsLogin(false); setIsLoginModalOpen(true); }}
                className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-2xl text-xl font-bold hover:bg-slate-200 transition-all shadow-xl"
              >
                Start Free Trial
              </button>
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-xl text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all border border-white/10">
                Talk to Sales
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 text-left">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4169E1] to-[#7B68EE] rounded-lg flex items-center justify-center text-white">
                  <Sparkles size={18} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">DinevaAI OS</span>
              </Link>
              <p className="text-slate-400 max-w-sm mb-8">
                The intelligent operating system for modern hospitality. Automating the hard parts, so you can focus on the food.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4">
                {['Analytics', 'Inventory', 'Staffing', 'Orders'].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div className="text-left">
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4">
                {['About', 'Careers', 'Contact', 'Privacy'].map(item => (
                  <li key={item}><Link href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-600">© 2026 DinevaAI OS. All rights reserved.</p>
            <div className="flex gap-6">
               <div className="w-5 h-5 bg-white/10 rounded-full" />
               <div className="w-5 h-5 bg-white/10 rounded-full" />
               <div className="w-5 h-5 bg-white/10 rounded-full" />
            </div>
          </div>
        </footer>

        {/* Login Modal Overlay */}
        <AnimatePresence>
          {isLoginModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)} />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white/20 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4169E1] via-[#7B68EE] to-[#6366F1]" />
                <button 
                  className="absolute top-4 right-4 text-slate-500 hover:text-white"
                  onClick={() => setIsLoginModalOpen(false)}
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-[#4169E1]/10 rounded-2xl flex items-center justify-center text-[#4169E1] mx-auto mb-4 border border-[#4169E1]/20">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome back' : 'Create account'}</h3>
                  <p className="text-slate-400 text-sm">Access your intelligence dashboard</p>
                </div>

                <div className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input type="text" placeholder="Guntass Kaur" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#4169E1] outline-none transition-all" />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input type="email" placeholder="name@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#4169E1] outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#4169E1] outline-none transition-all" />
                    </div>
                  </div>

                  <button className="w-full bg-[#4169E1] text-white py-4 rounded-xl font-bold mt-4 hover:bg-blue-600 transition-all shadow-lg shadow-[#4169E1]/20">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>

                  <p className="text-center text-sm text-slate-500 mt-6">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-[#4169E1] font-bold hover:underline">
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-black/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group text-left"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Terminal,
  Activity,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function DinevaLanding() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <main className="bg-[#050505] text-[#d1d5db] min-h-screen font-sans selection:bg-[#ffb347] selection:text-black overflow-hidden relative">
      
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* Intro Reveal */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 2.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, filter: "blur(20px)", opacity: 0 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff8c42]/20 blur-[80px] rounded-full"></div>
          <span className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#ffc857] via-[#ffb347] to-[#ff5a5f] relative z-10 drop-shadow-[0_0_30px_rgba(255,179,71,0.4)]">
            DINEVA OS
          </span>
          <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             transition={{ delay: 1, duration: 1 }}
             className="mt-6 text-sm tracking-[0.3em] uppercase text-[#ffb347]/70 font-light"
          >
            System Initializing...
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-busy-restaurant-kitchen-4252-large.mp4" type="video/mp4" />
          </video>
          {/* Layered Gradients for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#0b0d10]/60 to-[#050505] backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#ff8c42]/10 mix-blend-overlay"></div>
        </motion.div>

        {/* Floating Holographic Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
           <motion.div 
             animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute top-[20%] left-[10%] w-64 h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center p-4 transform -skew-x-12"
           >
              <Activity className="w-8 h-8 text-[#ffb347] mr-4" />
              <div>
                <div className="text-xs text-white/50 uppercase">Kitchen Load</div>
                <div className="text-xl font-bold text-white">Optimal (82%)</div>
              </div>
           </motion.div>
           <motion.div 
             animate={{ y: [20, -20, 20], x: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-[20%] right-[10%] w-56 h-24 bg-white/5 backdrop-blur-md border border-[#ff5a5f]/20 rounded-2xl flex items-center p-4 transform skew-x-12"
           >
              <Zap className="w-6 h-6 text-[#ff5a5f] mr-4" />
              <div>
                <div className="text-xs text-white/50 uppercase">Live Orders</div>
                <div className="text-lg font-bold text-[#ff5a5f]">Surge Detected</div>
              </div>
           </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="relative z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center mt-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-[0_0_40px_rgba(255,179,71,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-[#ffc857]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#d1d5db]">The Future of Intelligent Restaurant Operations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter mb-8 leading-[1.05] text-white"
          >
            AI-Powered <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc857] via-[#ffb347] to-[#ff8c42] drop-shadow-2xl">
              Hospitality
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 items-center mt-12"
          >
            <Link href="/dashboard">
              <button className="group relative px-10 py-5 bg-[#ffb347] rounded-full font-bold text-black overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,179,71,0.4)] hover:shadow-[0_0_60px_rgba(255,179,71,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <span className="relative flex items-center gap-3 text-lg">
                  Explore Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <button className="group px-10 py-5 bg-white/5 border border-white/10 rounded-full font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20">
              <span className="flex items-center gap-3 text-lg">
                Watch Experience
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 4, duration: 1 }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
           <span className="text-xs tracking-[0.2em] uppercase text-white/30">System Active</span>
           <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
             <motion.div 
               animate={{ y: ['-100%', '100%'] }} 
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-full h-1/2 bg-[#ffb347]" 
             />
           </div>
        </motion.div>
      </section>

      {/* Visual Workflows Container */}
      <div className="relative z-10 bg-[#050505]">
        
        {/* SECTION 1: SMART ORDER FLOW */}
        <VisualSection 
          title="Autonomic Order Flow"
          subtitle="Visualize the pipeline"
          align="left"
          visual={
            <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center bg-[#0b0d10] rounded-[2rem] border border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden group">
               {/* Ambient Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#ff8c42]/10 blur-[100px] rounded-full"></div>
               
               {/* Connected Nodes Path */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
                 <motion.path 
                    d="M 100 300 C 300 300, 300 150, 500 150 C 700 150, 700 450, 900 300" 
                    fill="transparent" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="2"
                 />
                 <motion.path 
                    d="M 100 300 C 300 300, 300 150, 500 150 C 700 150, 700 450, 900 300" 
                    fill="transparent" 
                    stroke="url(#flowGrad)" 
                    strokeWidth="3"
                    strokeDasharray="100 300"
                    animate={{ strokeDashoffset: [400, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 <defs>
                   <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="transparent" />
                     <stop offset="50%" stopColor="#ffb347" />
                     <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
               </svg>

               {/* Live Nodes */}
               <div className="hidden md:block">
                 <WorkflowNode x="10%" y="50%" icon={<Users />} label="Customer POS" status="Receiving" color="#ffffff" delay={0} />
                 <WorkflowNode x="40%" y="25%" icon={<Activity />} label="DINEVA Engine" status="Routing" color="#ffc857" delay={1} />
                 <WorkflowNode x="65%" y="75%" icon={<Flame />} label="Kitchen Display" status="Cooking" color="#ff5a5f" delay={2} />
                 <WorkflowNode x="90%" y="50%" icon={<CheckCircle2 />} label="Expeditor" status="Ready" color="#ffb347" delay={3} />
               </div>

               {/* Mobile Fallback Nodes */}
               <div className="flex md:hidden flex-col gap-6 items-center w-full px-6 z-10">
                 <WorkflowNodeMobile icon={<Users />} label="Customer POS" color="#ffffff" />
                 <div className="w-[2px] h-6 bg-gradient-to-b from-white/20 to-[#ffc857]/20"></div>
                 <WorkflowNodeMobile icon={<Activity />} label="DINEVA Engine" color="#ffc857" />
                 <div className="w-[2px] h-6 bg-gradient-to-b from-[#ffc857]/20 to-[#ff5a5f]/20"></div>
                 <WorkflowNodeMobile icon={<Flame />} label="Kitchen Display" color="#ff5a5f" />
               </div>
            </div>
          }
        />

        {/* SECTION 2: AI KITCHEN CONTROL */}
        <VisualSection 
          title="Predictive Kitchen Control"
          subtitle="Heatmaps & live load balancing"
          align="right"
          visual={
            <div className="relative w-full h-auto min-h-[500px] md:h-[600px] bg-[#111418] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col p-6 md:p-8">
              {/* Dashboard Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                 <div className="text-lg md:text-xl font-bold tracking-widest text-white/90">KITCHEN OPS</div>
                 <div className="flex gap-4">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ff5a5f] animate-pulse"></span> <span className="text-xs text-white/50">Surge Alert</span></div>
                 </div>
              </div>

              {/* Station Heatmaps */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative bg-[#050505] rounded-2xl border border-[#ff5a5f]/20 p-6 overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[#ff5a5f]/5"></div>
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#ff5a5f]/30 blur-[50px] rounded-full"></motion.div>
                  <div className="relative z-10 text-[#ff5a5f] text-sm uppercase tracking-widest mb-4">Grill Station</div>
                  <div className="relative z-10 flex items-end justify-between">
                     <span className="text-4xl md:text-5xl font-black text-white">98%</span>
                     <span className="text-xs text-white/50 font-mono">LOAD</span>
                  </div>
                  <div className="relative z-10 mt-6 md:mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} transition={{ duration: 1 }} className="h-full bg-[#ff5a5f]"></motion.div>
                  </div>
                </div>

                <div className="relative bg-[#050505] rounded-2xl border border-[#ffb347]/20 p-6 overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[#ffb347]/5"></div>
                  <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ffb347]/10 blur-[40px] rounded-full"></motion.div>
                  <div className="relative z-10 text-[#ffb347] text-sm uppercase tracking-widest mb-4">Prep Area</div>
                  <div className="relative z-10 flex items-end justify-between">
                     <span className="text-4xl md:text-5xl font-black text-white">65%</span>
                     <span className="text-xs text-white/50 font-mono">LOAD</span>
                  </div>
                  <div className="relative z-10 mt-6 md:mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} whileInView={{ width: '65%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-[#ffb347]"></motion.div>
                  </div>
                </div>
                
                <div className="md:col-span-2 relative bg-[#050505] rounded-2xl border border-white/5 p-6 flex items-center justify-between mt-2">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#ffc857]/10 border border-[#ffc857]/20 flex items-center justify-center">
                       <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#ffc857]" />
                     </div>
                     <div>
                       <div className="text-white font-bold text-base md:text-lg">Avg Ticket Time</div>
                       <div className="text-white/40 text-xs md:text-sm">Target: 12m</div>
                     </div>
                   </div>
                   <div className="text-2xl md:text-4xl font-black text-[#ffc857]">09m 24s</div>
                </div>
              </div>
            </div>
          }
        />

        {/* SECTION 3: ANALYTICS EXPERIENCE */}
        <VisualSection 
          title="Holographic Analytics"
          subtitle="Real-time predictive forecasting"
          align="left"
          visual={
            <div className="relative w-full h-[500px] md:h-[600px] bg-[#0b0d10] rounded-[2rem] border border-white/5 p-6 md:p-10 flex flex-col justify-end overflow-hidden group shadow-2xl">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
              
              <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
                 <div className="text-[10px] md:text-xs text-white/40 mb-2 font-mono uppercase tracking-[0.2em]">Projected End of Day</div>
                 <div className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">$42,890</div>
                 <div className="mt-4 inline-flex items-center gap-2 bg-[#ffb347]/10 border border-[#ffb347]/20 px-3 py-1.5 rounded-md text-[#ffb347] text-xs md:text-sm font-semibold">
                   <TrendingUp className="w-4 h-4" /> AI Yield +18.4%
                 </div>
              </div>

              {/* Cinematic Graph */}
              <div className="relative h-[50%] md:h-[60%] w-full flex items-end gap-1 md:gap-2 z-10">
                {[30, 45, 60, 40, 80, 55, 95, 70, 100].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${height}%`, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 bg-gradient-to-t from-[#ff8c42]/10 via-[#ff8c42]/40 to-[#ffc857] rounded-t-sm relative shadow-[0_0_30px_rgba(255,140,66,0.1)]"
                  >
                    {/* Glowing Top Edge */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_#ffffff]"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          }
        />

      </div>

      {/* Cinematic Outro / CTA */}
      <section className="relative py-40 md:py-48 px-4 bg-[#050505] overflow-hidden">
        {/* Deep ambient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] to-[#050505]"></div>
        <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff8c42]/10 via-transparent to-transparent blur-[80px] md:blur-[100px] rounded-full pointer-events-none"
        ></motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#ffc857] to-[#ff5a5f] p-[1px] mb-10 md:mb-12 shadow-[0_0_50px_rgba(255,140,66,0.3)]"
          >
             <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
               <Terminal className="w-6 h-6 md:w-8 md:h-8 text-[#ffb347]" />
             </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[5.5rem] font-bold mb-6 md:mb-8 tracking-tighter leading-[1.1] text-white"
          >
            Ready to initialize <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc857] via-[#ffb347] to-[#ff5a5f]">DINEVA OS?</span>
          </motion.h2>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/dashboard">
              <button className="group relative px-8 py-5 md:px-14 md:py-6 mt-8 md:mt-10 bg-white/5 border border-white/20 backdrop-blur-2xl text-white font-bold rounded-full text-lg md:text-xl hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)]">
                <span className="flex items-center gap-4">
                  Access Neural Core <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Visual Section Layout Component
function VisualSection({ title, subtitle, visual, align }: { title: string, subtitle: string, visual: React.ReactNode, align: 'left'|'right' }) {
  return (
    <section className="py-24 md:py-40 px-6 max-w-[1400px] mx-auto relative">
      <div className={`flex flex-col ${align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
        
        {/* Minimal Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: align === 'right' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-[0.8] space-y-4 md:space-y-6 text-center lg:text-left w-full"
        >
          <div className="w-12 h-[2px] bg-[#ffb347] mb-6 md:mb-8 mx-auto lg:mx-0"></div>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-tight">
            {title}
          </h3>
          <p className="text-lg md:text-2xl font-light text-white/50 tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        {/* Massive Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex-[1.2] w-full"
        >
          {visual}
        </motion.div>

      </div>
    </section>
  );
}

// Helper for Workflow Nodes
function WorkflowNode({ x, y, icon, label, status, color, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay * 0.2 + 0.5, ease: "easeOut" }}
      className="absolute flex flex-col items-center gap-3 z-10"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-md opacity-50" style={{ backgroundColor: color }}></div>
        <div className="relative w-16 h-16 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center backdrop-blur-md">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-white whitespace-nowrap">{label}</div>
        <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color }}>{status}</div>
      </div>
    </motion.div>
  );
}

// Helper for Mobile Workflow Nodes
function WorkflowNodeMobile({ icon, label, color }: any) {
  return (
    <div className="flex items-center gap-4 w-full bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md">
       <div className="relative w-12 h-12 rounded-full bg-[#050505] border border-white/20 flex shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full blur-sm opacity-30" style={{ backgroundColor: color }}></div>
          {icon}
       </div>
       <div className="text-base font-bold text-white">{label}</div>
    </div>
  );
}

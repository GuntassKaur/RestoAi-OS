"use client";

import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { 
  ChevronRight, 
  ChefHat, 
  TrendingUp, 
  Users, 
  Workflow, 
  Terminal,
  Activity,
  UtensilsCrossed,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DinevaLanding() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#ff8a3d] selection:text-black overflow-hidden relative">
      
      {/* Intro Overlay */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 2, delay: 1 }}
        className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative flex flex-col items-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ff8a3d]/20 blur-[50px] rounded-full"></div>
          <span className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#ffc857] via-[#ff8a3d] to-[#ff5a5f] relative z-10 drop-shadow-[0_0_15px_rgba(255,138,61,0.5)]">
            DINEVA OS
          </span>
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 scale-105"
          >
            {/* Mixkit royalty free restaurant video */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-busy-restaurant-kitchen-4252-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/70 to-[#050505]"></div>
          {/* Animated Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: opacityHero }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(255,138,61,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-[#ffc857]" />
            <span className="text-sm font-medium text-white/80 tracking-widest uppercase">Powered by Advanced AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white"
          >
            Welcome to the Future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc857] via-[#ff8a3d] to-[#ff5a5f] drop-shadow-lg">Restaurant Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.2 }}
            className="text-lg md:text-2xl text-white/60 max-w-3xl mb-12 font-light"
          >
            AI-powered operations, smart analytics, automated workflows, and immersive dining management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link href="/dashboard">
              <button className="group relative px-8 py-4 bg-[#ff8a3d] rounded-full font-semibold text-black overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,138,61,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,138,61,0.7)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                <span className="relative flex items-center gap-2">
                  Launch Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
            
            <button className="group px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20">
              <span className="flex items-center gap-2">
                Explore Features
              </span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Sections */}
      <div className="relative z-10 bg-[#050505]">
        
        {/* Section 1: Smart Orders */}
        <FeatureSection 
          title="Smart Orders"
          subtitle="Real-time predictive pipeline"
          description="Watch orders flow dynamically. AI anticipates rush hours, pre-routes tickets to specific stations, and predicts prep times with 98% accuracy."
          icon={<Activity className="w-6 h-6 text-[#ff5a5f]" />}
          visual={
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5a5f]/10 to-transparent rounded-3xl blur-3xl"></div>
              {/* Floating Order Cards */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0], x: i === 2 ? [0, 10, 0] : [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
                  className={`absolute bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 w-72 ${i === 1 ? 'left-0 top-10' : i === 2 ? 'right-0 top-32' : 'left-1/2 bottom-10 -translate-x-1/2'}`}
                  style={{ zIndex: 10 - i }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold bg-[#ff5a5f]/20 text-[#ff5a5f] px-3 py-1 rounded-full">Table {12 + i}</span>
                    <span className="text-xs text-white/50 font-mono">00:0{i}:24</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                      <div className="h-2 bg-white/10 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex -space-x-2">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-[#0f1115] flex items-center justify-center text-[10px] text-white">CH</div>
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 border-2 border-[#0f1115] flex items-center justify-center text-[10px] text-white">AI</div>
                    </div>
                    <span className="text-sm font-medium text-[#ffc857] bg-[#ffc857]/10 px-2 py-1 rounded-md">Prep: 8m</span>
                  </div>
                </motion.div>
              ))}
            </div>
          }
          reverse={false}
        />

        {/* Section 2: Kitchen AI */}
        <FeatureSection 
          title="Kitchen AI"
          subtitle="Neural routing & heatmaps"
          description="Your kitchen, digitized. Our AI builds real-time heatmaps of station loads, automatically load-balancing tickets to keep your chefs in flow state."
          icon={<ChefHat className="w-6 h-6 text-[#ff8a3d]" />}
          visual={
            <div className="relative w-full h-[500px] bg-[#0f1115] rounded-[2rem] border border-white/10 overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff8a3d]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] flex flex-col gap-4">
                <div className="flex-1 rounded-2xl bg-gradient-to-r from-[#ff8a3d]/5 to-[#ffc857]/5 border border-[#ff8a3d]/20 relative overflow-hidden flex items-center justify-center backdrop-blur-md">
                   <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-48 h-48 bg-[#ff8a3d]/30 blur-[60px] rounded-full"></motion.div>
                   <div className="relative text-center">
                     <div className="text-[#ff8a3d] font-mono text-sm mb-1 uppercase tracking-wider">Grill Station</div>
                     <div className="text-3xl font-bold text-white">Optimal</div>
                   </div>
                </div>
                <div className="flex gap-4 flex-1">
                  <div className="flex-1 rounded-2xl bg-[#ff5a5f]/5 border border-[#ff5a5f]/20 flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-32 h-32 bg-[#ff5a5f]/40 blur-[50px] rounded-full"></motion.div>
                    <div className="relative text-center">
                     <div className="text-[#ff5a5f] font-mono text-sm mb-1 uppercase tracking-wider">Prep Area</div>
                     <div className="text-2xl font-bold text-white">High Load</div>
                   </div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center backdrop-blur-md">
                    <div className="relative text-center opacity-40">
                     <div className="text-white font-mono text-sm mb-1 uppercase tracking-wider">Fryer</div>
                     <div className="text-2xl font-bold text-white">Idle</div>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          }
          reverse={true}
        />

        {/* Section 3: Analytics */}
        <FeatureSection 
          title="Hyper-Analytics"
          subtitle="See the unseen"
          description="Holographic-inspired dashboards that don't just show data—they reveal opportunities. Predictive revenue, dynamic pricing suggestions, and inventory burn rates."
          icon={<TrendingUp className="w-6 h-6 text-[#ffc857]" />}
          visual={
            <div className="relative w-full h-[500px] flex items-end gap-3 p-10 bg-[#0f1115] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
               <div className="absolute top-10 left-10 z-10">
                 <div className="text-sm text-white/50 mb-1 font-mono uppercase tracking-widest">Projected Revenue</div>
                 <div className="text-5xl font-bold text-white drop-shadow-lg">$24,892 <span className="text-lg text-[#ffc857] ml-2 font-medium bg-[#ffc857]/10 px-3 py-1 rounded-full">+14.2% AI Lift</span></div>
               </div>
               
               {/* Grid background */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

               {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   whileInView={{ height: `${height}%` }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                   className="flex-1 bg-gradient-to-t from-[#ff8a3d]/20 via-[#ff8a3d]/80 to-[#ffc857] rounded-t-xl relative group shadow-[0_0_30px_rgba(255,138,61,0.2)]"
                 >
                   <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors rounded-t-xl"></div>
                   {/* Top glow */}
                   <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-[#ffc857] blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </motion.div>
               ))}
            </div>
          }
          reverse={false}
        />

        {/* Section 4: Automation */}
        <FeatureSection 
          title="Autonomic Workflows"
          subtitle="The restaurant that runs itself"
          description="Connect FOH to BOH through intelligent nodes. When inventory drops, suppliers are notified. When a VIP enters, the maître d' is alerted instantly."
          icon={<Workflow className="w-6 h-6 text-white" />}
          visual={
            <div className="relative w-full h-[500px] flex items-center justify-center bg-[#0f1115] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
               <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                 <motion.path 
                    d="M 150 250 C 250 250, 350 150, 450 250" 
                    fill="transparent" 
                    stroke="url(#grad1)" 
                    strokeWidth="3"
                    strokeDasharray="15 15"
                    animate={{ strokeDashoffset: [0, 150] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 <motion.path 
                    d="M 150 250 C 250 250, 350 350, 450 250" 
                    fill="transparent" 
                    stroke="url(#grad2)" 
                    strokeWidth="3"
                    strokeDasharray="15 15"
                    animate={{ strokeDashoffset: [150, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#ff5a5f" />
                     <stop offset="50%" stopColor="#ff8a3d" />
                     <stop offset="100%" stopColor="#ffc857" />
                   </linearGradient>
                   <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#ffc857" />
                     <stop offset="50%" stopColor="#ff8a3d" />
                     <stop offset="100%" stopColor="#ff5a5f" />
                   </linearGradient>
                 </defs>
               </svg>
               
               {/* Nodes */}
               <div className="absolute left-[15%] bg-[#050505] p-5 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,90,95,0.4)] z-10">
                 <Users className="w-8 h-8 text-[#ff5a5f]" />
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-white/50 whitespace-nowrap">FOH</div>
               </div>
               
               <div className="absolute top-[20%] left-1/2 -translate-x-1/2 bg-[#050505] p-6 rounded-3xl border border-[#ff8a3d]/50 shadow-[0_0_50px_rgba(255,138,61,0.5)] z-20">
                 <Terminal className="w-10 h-10 text-[#ff8a3d]" />
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold font-mono text-[#ff8a3d] whitespace-nowrap tracking-widest">DINEVA CORE</div>
               </div>
               
               <div className="absolute right-[15%] bg-[#050505] p-5 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,200,87,0.4)] z-10">
                 <UtensilsCrossed className="w-8 h-8 text-[#ffc857]" />
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono text-white/50 whitespace-nowrap">BOH</div>
               </div>
            </div>
          }
          reverse={true}
        />

      </div>

      {/* CTA Footer Section */}
      <section className="relative py-40 px-4 border-t border-white/10 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] to-[#050505]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff8a3d]/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            Ready to upgrade your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffc857] via-[#ff8a3d] to-[#ff5a5f] drop-shadow-xl">Hospitality OS?</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1 }}
             className="text-white/50 mb-12 text-xl font-light max-w-2xl mx-auto"
          >
            Join elite restaurants automating their workflows, maximizing margins, and delivering flawless experiences with DINEVA.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <button className="px-12 py-6 bg-white text-black font-bold rounded-full text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] group">
                <span className="flex items-center gap-3">
                  Initialize System <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function FeatureSection({ title, subtitle, description, visual, reverse, icon }: any) {
  return (
    <section className="py-32 md:py-40 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            {icon}
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            {title}
          </h3>
          <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] to-[#ffc857]">
            {subtitle}
          </p>
          <p className="text-xl text-white/50 leading-relaxed font-light">
            {description}
          </p>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          {visual}
        </motion.div>

      </div>
    </section>
  );
}

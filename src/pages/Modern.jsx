import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Globe, 
  Shield, 
  Zap, 
  Cpu, 
  ArrowRight,
  ChevronDown,
  Layers,
  Code,
  Lock,
  Activity
} from 'lucide-react';

// --- BRAND IDENTITY ---
const COLORS = {
  lightBlue: '#27AAE1',
  deepBlue: '#2B3990',
  orange: '#F15A29',
  grey: '#B3B3B3',
  black: '#111111',
  white: '#FFFFFF',
};

// --- COMPONENTS ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-multiply">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-6 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="w-full max-w-[95%] flex justify-between items-center text-[#111]">
        {/* Placeholder for Logo if image fails */}
        <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 cursor-pointer group">
           <img 
             src="tessa-group.png" 
             alt="Tessa Group" 
             className="h-12 w-auto object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
           />
        </div>
        </div>
        
        <div className="hidden md:flex gap-12 text-xs font-bold uppercase tracking-widest text-gray-600">
          <a href="#ecosystem" className="hover:text-[#F15A29] transition-colors">Ecosystem</a>
          <a href="#about" className="hover:text-[#F15A29] transition-colors">Legacy</a>
          <a href="#leadership" className="hover:text-[#F15A29] transition-colors">Leadership</a>
        </div>

        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-6 py-3 rounded-full hover:bg-[#F15A29] hover:text-white hover:border-[#F15A29] transition-all bg-white text-black">
          Contact <div className="w-2 h-2 bg-[#F15A29] rounded-full animate-pulse"></div>
        </button>
      </div>
    </motion.nav>
  );
};

// --- NEW HERO SECTION ---
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white pt-20">
       {/* Blended Gradient Background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-multiply opacity-50"
            style={{ backgroundColor: COLORS.lightBlue }}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[10%] w-[45vw] h-[45vw] rounded-full blur-[100px] mix-blend-multiply opacity-50"
            style={{ backgroundColor: COLORS.orange }}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 40, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] mix-blend-multiply opacity-45"
            style={{ backgroundColor: COLORS.deepBlue }}
          />
       </div>

       {/* Floating Doodles / Icons (Parallax feel) */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Left - Tech */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] opacity-80"
          >
             <Code className="text-[#27AAE1] w-12 h-12 md:w-16 md:h-16 transform -rotate-12" />
             <svg className="absolute -top-6 -left-6 w-12 h-12 text-[#2B3990] opacity-30" viewBox="0 0 100 100">
               <path d="M10,50 Q50,10 90,50" fill="none" stroke="currentColor" strokeWidth="4" />
             </svg>
          </motion.div>

          {/* Bottom Right - Security */}
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] opacity-80"
          >
             <Shield className="text-[#2B3990] w-14 h-14 md:w-20 md:h-20 transform rotate-6" />
             <div className="absolute -bottom-4 -right-8 w-4 h-4 rounded-full bg-[#F15A29] opacity-50"></div>
          </motion.div>

          {/* Middle Right - Energy */}
          <motion.div 
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[40%] right-[15%] opacity-60 hidden md:block"
          >
             <Zap className="text-[#F15A29] w-10 h-10" />
          </motion.div>

          {/* Middle Left - Abstract */}
          <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[30%] left-[15%] hidden md:block"
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 0L35 25L60 30L35 35L30 60L25 35L0 30L25 25L30 0Z" fill={COLORS.lightBlue} fillOpacity="0.2"/>
            </svg>
          </motion.div>
       </div>

       {/* Main Typography Content */}
       <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tight text-[#111] leading-[1.1] mb-8"
          >
            The ecosystem for <br/>
            <span className="relative inline-block z-10">
              secure innovation
              {/* Scribble Underline */}
              <svg 
                className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[0.3em] pointer-events-none z-[-1]" 
                viewBox="0 0 200 20" 
                preserveAspectRatio="none"
              >
                <path d="M0,15 Q100,0 200,10" fill="none" stroke={COLORS.orange} strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-medium mb-12 leading-relaxed"
          >
            Streamline your digital infrastructure, secure your assets, and power your future with Tessa Group.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            
            <button className="px-8 py-4 rounded-full bg-[#111] text-white font-bold text-lg hover:bg-[#F15A29] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
               Get Started <ArrowRight size={20} />
            </button>
          </motion.div>
          
         
       </div>
    </section>
  );
};


// Horizontal Scroll Section for Divisions (Company Colors on BG)
const EcosystemSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); // Adjusted for 4 cards

  const cards = [
    {
      title: "Technology",
      desc: "System Integration & Cloud Infrastructure.",
      color: COLORS.lightBlue,
      textColor: "text-white",
      icon: Cpu,
      stats: ["Cloud Systems", "IT Infrastructure"]
    },
    {
      title: "Security",
      desc: "Advanced SOC & Cyber Defense Strategies.",
      color: COLORS.deepBlue,
      textColor: "text-white",
      icon: Shield,
      stats: ["SOC Mgmt", "Threat Intel"]
    },
    {
      title: "Energy",
      desc: "Sustainable Power for Tomorrow.",
      color: COLORS.orange,
      textColor: "text-white",
      icon: Zap,
      stats: ["Renewables", "Smart Grids"]
    },
    {
        title: "Alliance",
        desc: "Strategic Global Partnerships & Integration.",
        color: COLORS.grey,
        textColor: "text-[#111]", // Grey background needs dark text
        icon: Layers,
        stats: ["Global Reach", "Strategic Partners"]
    }
  ];

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black" id="ecosystem">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {cards.map((card, i) => (
            <div 
                key={i} 
                className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center p-10 md:p-24 border-r border-white/10"
                style={{ backgroundColor: card.color }}
            >
              <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10rem] md:text-[20rem] font-black opacity-[0.05] select-none pointer-events-none text-white leading-none">
                0{i + 1}
              </div>
              
              <div className="max-w-4xl w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="w-20 h-20 mb-8 rounded-full border border-white/30 flex items-center justify-center text-white shadow-xl bg-white/10 backdrop-blur-sm">
                      <card.icon size={40} className={card.textColor} />
                   </div>
                   <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 ${card.textColor}`}>
                     {card.title}
                   </h2>
                   <p className={`text-2xl leading-relaxed mb-12 opacity-90 ${card.textColor}`}>
                     {card.desc}
                   </p>
                   <button className={`flex items-center gap-4 text-sm font-bold uppercase tracking-widest border-b-2 pb-2 hover:opacity-70 transition-all ${card.textColor}`} style={{ borderColor: 'currentColor' }}>
                     Explore Division <ArrowRight size={16} />
                   </button>
                </div>

                <div className={`h-[400px] w-full rounded-2xl border border-white/20 p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-md`}>
                   <div className="flex justify-between items-start">
                      <div className="p-4 bg-white/20 rounded-full shadow-sm"><card.icon size={24} className={card.textColor} /></div>
                      <ArrowUpRight className={`${card.textColor} opacity-60 group-hover:opacity-100 transition-colors`} />
                   </div>
                   <div className="space-y-4">
                      {card.stats.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                           <div className="w-2 h-2 rounded-full bg-white"></div>
                           <span className={`text-lg font-medium ${card.textColor}`}>{s}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StickyIntro = () => {
  return (
    <section className="bg-white text-black py-32 relative z-20" id="about">
       <div className="max-w-[95%] mx-auto grid md:grid-cols-2 gap-20">
          <div className="relative">
             <div className="sticky top-32">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                   A NEW <br/>
                   <span className="text-[#F15A29]">CHAPTER</span><br/>
                   BEGINS.
                </h2>
                <p className="text-xl text-gray-500 font-medium max-w-sm">
                   Since 2005, we have been innovating across technology, energy, and security.
                </p>
             </div>
          </div>
          <div className="space-y-32 pt-20">
             {[
               { title: "Resilience", desc: "Built to withstand the shifts of global markets and digital threats.", color: COLORS.deepBlue },
               { title: "Innovation", desc: "Constantly redefining digital infrastructure and sustainable power.", color: COLORS.lightBlue },
               { title: "Authority", desc: "Trusted by government, banking, and regulated enterprise sectors.", color: COLORS.orange }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ margin: "-100px" }}
                 className="group"
               >
                 <div className="h-[1px] w-full bg-gray-200 mb-8 origin-left group-hover:scale-x-100 transition-transform"></div>
                 <div className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: item.color }}>0{i + 1} — {item.title}</div>
                 <p className="text-3xl md:text-4xl font-bold leading-tight">{item.desc}</p>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

const LeadershipSection = () => {
    return (
        <section className="py-32 bg-white" id="leadership">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-5xl font-black tracking-tighter mb-20 text-[#111]">Tessa Group Leadership</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {[
                        { name: "Ajri Shej", role: "Chairman of the Board", color: COLORS.orange },
                        { name: "Dushko Temkov", role: "GM – Tessa Tech", color: COLORS.lightBlue },
                        { name: "Filip Simeonov", role: "GM – Tessa Sec", color: COLORS.deepBlue },
                        { name: "Bujar Ibrahimi", role: "GM – Tessa Sec KS", color: COLORS.deepBlue },
                        { name: "Ilir Shehu", role: "GM – Infosoft/Tech", color: COLORS.lightBlue },
                    ].map((leader, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-gray-100 mb-6 relative overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500">
                                {/* Placeholder Gradient imitating Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-400 opacity-30">{leader.name.split(' ')[0]}</span>
                                </div>
                                <div className={`absolute bottom-0 left-0 w-full h-2`} style={{ backgroundColor: leader.color }}></div>
                                <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-[#111] mb-1 group-hover:text-[#F15A29] transition-colors">{leader.name}</h4>
                            <p className="text-xs font-bold text-gray-500 leading-tight uppercase tracking-wide">{leader.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PartnersSection = () => (
    <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black mb-16 tracking-tight">International Partnership</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="font-black text-2xl flex items-center text-[#C01818]">FORTINET <span className="text-black text-[10px] ml-2 font-bold border border-gray-200 bg-white px-2 py-1 rounded-full">Select Partner</span></div>
                <div className="font-black text-2xl flex items-center text-[#00bceb]">CISCO <span className="text-black text-[10px] ml-2 font-bold border border-gray-200 bg-white px-2 py-1 rounded-full">Gold Partner</span></div>
                <div className="font-black text-2xl flex items-center text-[#007db8]">DELL <span className="text-gray-500 text-[10px] ml-2 font-medium">Technologies</span></div>
                <div className="font-black text-2xl flex items-center text-[#ec008c]">CHECK POINT</div>
            </div>
        </div>
    </section>
);

const Modern = () => {
  return (
    <div className="min-h-screen font-sans bg-white selection:bg-[#F15A29] selection:text-white">
      <Nav />
      <Grain />
      
      {/* --- REPLACED HERO --- */}
      <HeroSection />

      {/* --- INTRO SCROLL (2nd Section) --- */}
      <StickyIntro />

      {/* --- HORIZONTAL SCROLL (ECOSYSTEM) --- */}
      <EcosystemSection />

      {/* --- STATS GRID --- */}
      <section className="py-32 bg-white px-6">
         <div className="max-w-[95%] mx-auto">
            <h2 className="text-[8vw] font-black tracking-tighter leading-none mb-20 border-b border-black pb-8">
              OUR IMPACT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
               {[
                 { num: "18+", label: "Years Exp." },
                 { num: "100+", label: "Employees" },
                 { num: "50+", label: "Partners" },
                 { num: "08", label: "Companies" },
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-12 hover:bg-[#F15A29] hover:text-white transition-colors duration-500 group cursor-pointer aspect-square flex flex-col justify-between">
                    <ArrowUpRight className="self-end opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <div className="text-6xl md:text-8xl font-black tracking-tighter mb-2">{stat.num}</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-50">{stat.label}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
      
      {/* --- LEADERSHIP --- */}
      <LeadershipSection />
      
      {/* --- PARTNERS --- */}
      <PartnersSection />

      {/* --- FOOTER REVEAL WRAPPER --- */}
      <div className="relative h-[80vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <div className="fixed bottom-0 h-[80vh] w-full bg-[#111] text-white flex flex-col justify-center p-6 md:p-20 z-0">
           <div className="flex justify-between items-start w-full max-w-[95%] mx-auto">
             <div>
                 <h2 className="text-[6vw] font-black tracking-tighter leading-none mb-8">
                   READY TO <br/> <span className="text-[#27AAE1]">SCALE?</span>
                 </h2>
                 <button className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#F15A29] hover:text-white transition-colors">
                   Start a Project
                 </button>
             </div>
             <div className="text-right hidden md:block">
                 <div className="mb-8">
                     <span className="font-bold text-2xl tracking-tight">Tessa Group</span>
                 </div>
                 <div className="text-2xl font-bold mb-2">Skopje, Macedonia</div>
                 <div className="text-gray-500">info.mk@tessa.group</div>
                 <div className="text-gray-500 mb-8">+389 2 322 7055</div>
                 <div className="flex gap-6 justify-end text-sm font-bold uppercase tracking-widest">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                 </div>
             </div>
           </div>
           
           <div className="absolute bottom-10 left-0 w-full px-20 flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-600">
             <div>© 2025 Tessa Group</div>
             <div className="flex gap-8">
                 <span>Privacy</span>
                 <span>Terms</span>
             </div>
           </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body { background-color: #fff; }
      `}</style>
    </div>
  );
};

export default Modern;
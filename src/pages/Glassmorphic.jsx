import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, Shield, Zap, Server, 
  Briefcase, Mail, Phone, MapPin, Linkedin, 
  Instagram, Facebook, ArrowUpRight, Globe, CheckCircle, Users, Hexagon
} from 'lucide-react';

// --- Animation Components ---

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: '800ms'
      }}
      className={`transition-all ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
        isVisible 
          ? "opacity-100 translate-y-0 filter blur-0" 
          : "opacity-0 translate-y-12 filter blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Visual Elements ---

const NoiseFilter = () => (
  <svg className="hidden">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="noise" />
      <feComposite operator="in" in2="SourceGraphic" result="composite" />
      <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
    </filter>
  </svg>
);

const BackgroundMesh = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#F5F5F7]">
    {/* Gradient Orbs - Brand Colors */}
    <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#2B3990] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.15] animate-blob"></div>
    <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] bg-[#F15A29] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.10] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-[#27AAE1] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.15] animate-blob animation-delay-4000"></div>
    
    {/* Grain Texture Overlay */}
    <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6`}>
      <div className={`
        flex items-center justify-between px-8 py-4 transition-all duration-500
        ${isScrolled 
          ? "w-[90%] bg-white/70 backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40" 
          : "w-full max-w-[1400px] bg-transparent"
        }
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
           <img 
             src="tessa-group.png" 
             alt="Tessa Group" 
             className="h-12 w-auto object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
           />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {["About", "Companies", "Leadership", "Contact"].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-[#2B3990] transition-colors relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#F15A29] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button className="hidden lg:flex px-6 py-2.5 bg-[#1a1a1a] text-white text-sm font-medium rounded-full hover:bg-[#F15A29] transition-colors duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
          Get in Touch
        </button>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#1a1a1a] hover:text-[#F15A29] transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div className={`fixed inset-0 bg-[#1a1a1a] z-[60] transition-transform duration-500 cubic-bezier(0.87, 0, 0.13, 1) ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex justify-end p-8">
        <button onClick={() => setMobileOpen(false)} className="text-white hover:text-[#F15A29] hover:rotate-90 transition-all duration-300">
          <X className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-[80vh] gap-8">
        {["About", "Companies", "Leadership", "Contact"].map((link, i) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
            className="text-5xl font-light text-white hover:text-[#F15A29] transition-colors tracking-tight"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <Reveal delay={100}>
          <h1 className="text-[12vw] md:text-[8.5vw] leading-[0.9] font-semibold text-[#1a1a1a] tracking-[-0.03em] mb-10">
            EMPOWERING <br />
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B3990] via-[#F15A29] to-[#2B3990] bg-[length:200%_auto] animate-gradient">
                WHAT'S NEXT.
              </span>
              {/* Grainy overlay for text */}
              <span className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></span>
            </span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8">
          <Reveal delay={300} className="lg:col-span-6">
             <div className="relative pl-6 border-l-2 border-[#1a1a1a]/10">
                 <p className="text-xl md:text-2xl text-gray-800 font-light leading-relaxed">
                   Connecting people, systems, and ideas to build a smarter future through <span className="font-semibold text-[#2B3990]">Technology</span>, <span className="font-semibold text-[#2B3990]">Security</span>, and <span className="font-semibold text-[#F15A29]">Energy</span>.
                 </p>
                 <div className="mt-10 flex gap-6">
                    <button className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-[#F15A29] transition-colors border-b border-[#1a1a1a] hover:border-[#F15A29] pb-1">
                        Our Vision
                    </button>
                    <button className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#2B3990] transition-colors pb-1">
                        Explore Portfolio
                    </button>
                 </div>
             </div>
          </Reveal>
          
          <Reveal delay={400} className="lg:col-span-6 hidden lg:flex justify-end relative">
             {/* Glass Cards */}
             <div className="relative w-full max-w-md h-[300px]">
                <div className="absolute right-0 top-0 w-80 p-6 bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl z-20 animate-float hover:scale-105 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                        <Shield className="w-8 h-8 text-[#2B3990]" strokeWidth={1.5} />
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    </div>
                    <div className="h-32 bg-gradient-to-b from-[#2B3990]/10 to-transparent rounded-sm mb-4 border border-white/20"></div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Cyber Defense</span>
                        <span className="text-lg font-mono text-[#1a1a1a]">99.9%</span>
                    </div>
                </div>

                <div className="absolute left-10 bottom-0 w-72 p-6 bg-[#1a1a1a]/5 backdrop-blur-md border border-white/20 z-10 animate-float-delayed hover:scale-105 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-4">
                        <Zap className="w-8 h-8 text-[#F15A29]" strokeWidth={1.5} />
                        <ArrowUpRight className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="h-1 bg-gray-300 rounded-full mb-2 overflow-hidden">
                        <div className="h-full w-3/4 bg-[#F15A29]"></div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Energy Output</span>
                </div>
             </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-16 relative z-10 bg-white/30 backdrop-blur-md border-y border-white/20 overflow-hidden">
      <div className="relative flex whitespace-nowrap animate-marquee">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center gap-20 mx-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-default hover:text-[#2B3990]">
             <span className="text-3xl font-bold tracking-tighter text-[#1a1a1a]">CISCO</span>
             <span className="text-3xl font-bold tracking-tighter text-[#1a1a1a]">DELL</span>
             <span className="text-3xl font-bold tracking-tighter text-[#1a1a1a]">FORTINET</span>
             <span className="text-3xl font-bold tracking-tighter text-[#1a1a1a]">MICROSOFT</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Industries = () => {
  const cards = [
    { 
      title: "Tessa Tech", 
      icon: <Server className="w-6 h-6"/>,
      desc: "Advanced ICT infrastructure and cloud solutions." 
    },
    { 
      title: "Tessa Sec", 
      icon: <Shield className="w-6 h-6"/>,
      desc: "Cybersecurity operations and threat intelligence." 
    },
    { 
      title: "Tessa Energy", 
      icon: <Zap className="w-6 h-6"/>,
      desc: "Sustainable renewable energy infrastructure." 
    },
    { 
      title: "Solutions", 
      icon: <Globe className="w-6 h-6"/>,
      desc: "Strategic global consultancy and alliances." 
    },
  ];

  return (
    <section id="companies" className="py-32 relative z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="mb-20 border-b border-gray-200 pb-10">
             <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight mb-6">
               Divisions of Excellence
             </h2>
             <p className="text-xl text-gray-500 font-light max-w-2xl">
               Specialized units delivering world-class solutions across critical sectors.
             </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {cards.map((card, idx) => (
             <Reveal key={idx} delay={idx * 100}>
                <div 
                  className="group relative h-[380px] p-8 flex flex-col justify-between
                  bg-white/40 backdrop-blur-xl border border-white/60 
                  hover:bg-white/80 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
                >
                   {/* Grainy Overlay on Card */}
                   <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

                   <div className="relative z-10">
                       <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-[#F15A29] transition-all duration-500">
                           {card.icon}
                       </div>
                       <h3 className="text-2xl font-medium text-[#1a1a1a] mb-3 group-hover:text-[#2B3990] transition-colors">{card.title}</h3>
                       <p className="text-gray-600 text-sm leading-relaxed font-light border-l border-gray-300 pl-4 group-hover:border-[#F15A29] transition-colors">
                           {card.desc}
                       </p>
                   </div>

                   <div className="relative z-10 flex justify-end">
                       <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-[#2B3990] group-hover:text-white group-hover:border-[#2B3990] transition-all duration-300">
                           <ArrowUpRight className="w-4 h-4" />
                       </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
    return (
        <section className="py-20 relative z-10">
             <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="relative bg-[#0F1215] text-white p-12 md:p-24 overflow-hidden shadow-2xl">
                    {/* Grain & Gradients */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#2B3990] to-transparent opacity-30 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#F15A29] to-transparent opacity-20 blur-[120px]"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end relative z-10">
                        <Reveal>
                            <h2 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-12">
                                Global <br/><span className="text-gray-500">Impact.</span>
                            </h2>
                            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                                <div>
                                    <span className="block text-4xl md:text-5xl font-bold mb-2">18+</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Years Active</span>
                                </div>
                                <div>
                                    <span className="block text-4xl md:text-5xl font-bold mb-2">100+</span>
                                    <span className="text-xs uppercase tracking-widest text-gray-500">Global Experts</span>
                                </div>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={200} className="lg:pl-20">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                                "We don't simply follow market trends. We engineer the infrastructure that defines the future of the region."
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-white/30"></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-[#F15A29]">Our Philosophy</span>
                            </div>
                        </Reveal>
                    </div>
                </div>
             </div>
        </section>
    );
};

const Leadership = () => {
    const leaders = [
        { name: "Ajri Shej", role: "Chairman", initials: "AS" },
        { name: "Dushko Temkov", role: "GM, Tech", initials: "DT" },
        { name: "Filip Simeonov", role: "GM, Sec", initials: "FS" },
        { name: "Bujar Ibrahimi", role: "GM, Sec (KS)", initials: "BI" },
        { name: "Ilir Shehu", role: "GM, Infosoft", initials: "IS" },
    ];

    return (
        <section id="leadership" className="py-32 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                 <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                         <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">Leadership</h2>
                         <button className="hidden md:block text-sm font-bold uppercase tracking-widest border-b border-[#1a1a1a] pb-1 hover:text-[#F15A29] hover:border-[#F15A29] transition-colors">
                             View Organizational Chart
                         </button>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-gray-200 border border-gray-200">
                    {leaders.map((leader, idx) => (
                        <Reveal key={idx} delay={idx * 50} className="h-full">
                            <div className="group relative h-[300px] bg-white p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300 cursor-default">
                                <div className="flex justify-between items-start">
                                    <span className="text-4xl font-light text-gray-200 group-hover:text-[#2B3990] transition-colors duration-500">0{idx + 1}</span>
                                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F15A29]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{leader.name}</h3>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{leader.role}</p>
                                </div>
                                <div className="absolute inset-0 border-b-2 border-[#2B3990] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    return (
        <section className="py-32 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <Reveal>
                    <div className="bg-[#F5F5F7] p-12 md:p-32 text-center border border-white/50 relative overflow-hidden">
                        {/* Grainy Texture */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        
                        <h2 className="text-6xl md:text-9xl font-semibold text-[#1a1a1a] mb-8 tracking-tighter relative z-10">
                            LET'S TALK.
                        </h2>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative z-10 mt-12">
                            <button className="px-10 py-4 bg-[#1a1a1a] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#F15A29] hover:scale-105 transform transition-all duration-300">
                                Start a Project
                            </button>
                            <a href="mailto:info@tessa.group" className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#2B3990] hover:border-[#2B3990] transition-colors">
                                info@tessa.group
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white py-20 relative z-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
                    <div className="md:col-span-1">
                        <img 
                           src="tessa-group.png" 
                           alt="Tessa Group" 
                           className="h-12 w-auto object-contain mb-8 brightness-0 invert opacity-90" 
                        />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A global leader in technology, security, and energy solutions operating across the Balkans and Europe.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Sitemap</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['About', 'Leadership', 'Careers', 'News'].map(item => (
                                <li key={item}><a href="#" className="hover:text-[#F15A29] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Privacy', 'Terms', 'Cookies'].map(item => (
                                <li key={item}><a href="#" className="hover:text-[#F15A29] transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Social</h4>
                        <div className="flex gap-4">
                            {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="hover:text-[#F15A29] transition-colors"><Icon className="w-5 h-5" /></a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
                    <p>© 2026 Tessa Group.</p>
                    <p>Skopje • Prishtina • Tirana</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main App Component ---

function Glassmorphic() {
  return (
    <div className="font-sans antialiased bg-[#F5F5F7] text-[#1a1a1a] selection:bg-[#F15A29] selection:text-white min-h-screen relative">
      <NoiseFilter />
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
        }

        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 40s linear infinite;
        }

        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 15s infinite;
        }
        .animation-delay-2000 { animation-delay: 5s; }
        .animation-delay-4000 { animation-delay: 10s; }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 10s ease-in-out infinite 2s; }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient {
            animation: gradient 12s ease infinite;
        }

        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}} />
      
      <BackgroundMesh />
      <Navbar />
      <Hero />
      <Marquee />
      <Industries />
      <Impact />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}

export default Glassmorphic;
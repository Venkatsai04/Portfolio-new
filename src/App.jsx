import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- CONFIGURATION CONSTANTS (Strict Black & White) ---
const PRIMARY_COLOR = '#000000';
const SECONDARY_COLOR = '#FFFFFF';
const FONT = 'Inter, sans-serif'; 
const MONO_FONT = 'Roboto Mono, monospace';
const MAX_PARTICLES = 10000;
const ELASTIC_EASING = 'cubic-bezier(0.25, 1, 0.5, 1)'; 

// --- DATA DERIVED FROM CV ---
const PORTFOLIO_DATA = {
  name: "VENKAT SAI UTHARADHI",
  discipline: "A MINIMALIST UI/UX ENGINEER", 
  location: "HYDERABAD, INDIA",
  email: "saik87630@gmail.com",
  github: "GitHub",
  googleDev: "Google Developer profile",
  intro_statement: "Engineering graduate with a passion for turning data, IoT, and scalable software systems into impactful solutions.",
  summary: "I am an engineer focused on the intersection of data, IoT, and highly scalable software. My process is centered on building efficient, maintainable products that genuinely solve real-world problems and elevate the user experience. I leverage full-stack expertise—from Python and JavaScript to the MERN stack—to guide projects through the complete SDLC, focusing on real-time device integration, debugging, and optimization.",
  projects: [
    { title: "ALARM X - AI SMART ALARM SYSTEM", year: "2025", tech: ["Gemini AI Studio", "React", "Redux"], desc: "Implemented face verification API using Gemini AI Studio, reducing oversleep incidents by 90%. Developed a smart alarm web app using React, Vite, and Tailwind CSS." },
    { title: "CONTENT X - AI PLATFORM", year: "2025", tech: ["Gemini API", "Node.js", "REST APIs"], desc: "Delivered real-time adaptive suggestions using Gemini API and React.js/Redux. Developed a Node.js backend ensuring secure data flow." },
    { title: "DIGITAL X - SERVICES PLATFORM", year: "2024", tech: ["MERN Stack", "Tailwind", "Payments"], desc: "A full-stack agency site. Optimized performance and deployed dashboards, Auth, and payments to improve job completion rates by 40%." },
    { title: "SOCIAL ENGINEERING INTERN", year: "2023", tech: ["MERN Stack", "Stripe", "UI Optimization"], desc: "Collaborated on the fundraising team to design and launch a high-conversion landing page. Attracted 200K+ visits and successfully raised 84,000 in donations." },
  ],
};

// --- UTILITIES ---

const TimeDisplay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-xs md:text-sm tracking-widest">{time}</span>;
};

const CustomCursor = ({ isHovering, mouseX, mouseY }) => {
  return (
    <div
      className={`
        fixed pointer-events-none rounded-full z-9999 
        transition-all duration-200 ease-out
        ${isHovering ? 'w-12 h-12 border-2 border-black bg-transparent' : 'w-4 h-4 bg-black border border-white'}
      `}
      style={{
        transform: `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`,
        boxShadow: isHovering ? 'none' : '0 0 0 1px #000', // Subtle shadow for contrast
      }}
    />
  );
};

// --- Magnetic Interaction Wrapper ---
const MagneticWrapper = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const center = {
            x: left + width / 2,
            y: top + height / 2
        };
        const sensitivity = 0.15; // How far to move the element
        const x = (clientX - center.x) * sensitivity;
        const y = (clientY - center.y) * sensitivity;
        setPosition({ x, y });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        const node = ref.current;
        // Only enable on devices with hover capability
        if (!node || !window.matchMedia('(hover: hover)').matches) return;

        node.addEventListener('mousemove', handleMouseMove);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    const style = {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: `transform 0.3s ${ELASTIC_EASING}`,
        willChange: 'transform'
    };

    if (!React.isValidElement(children)) return children;
    
    // Ensure styles are merged correctly
    return React.cloneElement(children, {
        ref,
        style: { ...children.props.style, ...style }
    });
};


const RevealStagger = ({ children, delay = 0.15, duration = 1.2, className }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const staggeredChildren = React.Children.map(children, (child, index) => {
    const style = {
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
      transitionDelay: `${isVisible ? index * delay : 0}s`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    };
    return (
      <div style={style} className="will-change-transform">
        {child}
      </div>
    );
  });

  return <div ref={ref} className={className}>{staggeredChildren}</div>;
};

// --- PARTICLE SYSTEM ---

class Particle {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.vx = 0;
        this.vy = 0;
        this.radius = 1.5;
        this.speed = 0.08; // Adjusted for faster animation
        this.friction = 0.93; // Adjusted for faster animation
        this.maxForce = 0.5;
    }

    update(mouseX, mouseY) {
        // Spring force towards target position
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        
        // Apply spring force with limits
        const distanceToTarget = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(distanceToTarget * this.speed, this.maxForce);
        const angle = Math.atan2(dy, dx);
        
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;
        
        // Mouse repulsion with smooth falloff
        const mouseDistance = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
        const repulsionRadius = 150; // Increased repulsion radius
        
        if (mouseDistance < repulsionRadius && mouseDistance > 0) {
            const repulsionForce = 8;
             const strength = (1 - mouseDistance / repulsionRadius) ** 2; // Use squared falloff (faster)
            const repelAngle = Math.atan2(this.y - mouseY, this.x - mouseX);
            
            this.vx += Math.cos(repelAngle) * repulsionForce * strength;
            this.vy += Math.sin(repelAngle) * repulsionForce * strength;
        }
        
        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.fillStyle = PRIMARY_COLOR; // Black particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const ParticleTextCanvas = ({ onReady, mouseX, mouseY }) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const isSetup = useRef(false);
    
    const textLines = PORTFOLIO_DATA.name.split(' ');
    
    const calculateParticles = useCallback((ctx, width, height) => {
        if (width <= 0 || height <= 0) return;

        // ** DECREASED FONT SIZE by ~3% **
        const fontSize = width > 1024 ? 155 : width > 768 ? 107 : 53; 
        const fontStyle = `900 ${fontSize}px ${FONT}`;

        ctx.font = fontStyle;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = PRIMARY_COLOR; 

        // Fill background with white first (important for clear sampling)
        ctx.fillStyle = SECONDARY_COLOR;
        ctx.fillRect(0, 0, width, height);
        
        // Draw text in black
        ctx.fillStyle = PRIMARY_COLOR;
        ctx.font = fontStyle; 

        let currentY = height / 2 - (textLines.length - 1) * fontSize * 0.45;

        textLines.forEach(line => {
            ctx.fillText(line.toUpperCase(), width / 2, currentY);
            currentY += fontSize * 0.9;
        });

        const data = ctx.getImageData(0, 0, width, height).data;
        particles.current = [];
        
        // ** ADJUSTED SAMPLING STEP **
        const step = width > 768 ? 4 : 3; 

        for (let x = 0; x < width; x += step) {
            for (let y = 0; y < height; y += step) {
                const index = (y * width + x) * 4;
                const red = data[index];
                const green = data[index + 1];
                const blue = data[index + 2];
                const alpha = data[index + 3];
                
                // Check for black pixels (all RGB values low and alpha high)
                if (red < 128 && green < 128 && blue < 128 && alpha > 128) {
                    if (particles.current.length < MAX_PARTICLES) {
                        const randomOffset = 150;
                        particles.current.push(new Particle(
                            x + (Math.random() - 0.5) * randomOffset, 
                            y + (Math.random() - 0.5) * randomOffset,
                            x, y
                        ));
                    }
                }
            }
        }
        onReady(true);
    }, [textLines, onReady]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            // Setting canvas dimensions based on CSS size for high DPI rendering
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            calculateParticles(ctx, canvas.width, canvas.height);
        };
        
        if (!isSetup.current) {
            // Use requestAnimationFrame for initial setup to ensure size is correct after layout
            requestAnimationFrame(() => {
                resize(); 
                isSetup.current = true;
            });
        }

        window.addEventListener('resize', resize);

        const animate = () => {
            // Clear background with a white fill for a clean look
            ctx.fillStyle = SECONDARY_COLOR; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const canvasMouseX = mouseX;
            const canvasMouseY = mouseY;
            
            particles.current.forEach(p => {
                p.update(canvasMouseX, canvasMouseY);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [calculateParticles, mouseX, mouseY]);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-10"
        />
    );
};

// --- FIXED UI COMPONENTS ---

const FixedHeader = ({ activeView, setView, contentRef, viewState }) => {
  const links = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'contact', label: 'CONTACT' },
  ];
  
  const handleScrollTo = (id) => {
    // If we are on a project page, we must first set the view
    // to render the main content, then scroll.
    if (viewState.view === 'project') {
        // Set the view to the target section ID (e.g., 'about')
        // This will trigger a re-render in App
        setView({ view: id }); 
        
        // We must wait for the re-render to complete before scrolling
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element && contentRef.current) {
                contentRef.current.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 0); // 0ms timeout waits for next tick (after render)
    } else {
        // We are already on the main page, just scroll
        const element = document.getElementById(id);
        if (element && contentRef.current) {
            contentRef.current.scrollTo({
                top: element.offsetTop, 
                behavior: 'smooth'
            });
            setView({ view: id }); // Set active link
        }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-10 sm:h-14 border-b px-4 md:px-8 flex items-center justify-between"
      style={{ borderColor: PRIMARY_COLOR, backgroundColor: SECONDARY_COLOR, color: PRIMARY_COLOR }}
    >
      <div className="flex items-center space-x-4">
        <MagneticWrapper>
            <span className="font-mono text-sm md:text-base font-bold tracking-wider hidden sm:inline">
                {PORTFOLIO_DATA.name.toUpperCase()}
            </span>
        </MagneticWrapper>
        <span className="font-mono text-xs md:text-sm tracking-widest hidden lg:inline border-l border-r px-4 h-4 leading-4 border-black/50">
          {PORTFOLIO_DATA.location.toUpperCase()}
        </span>
        <TimeDisplay />
      </div>

      <nav className="flex space-x-2 sm:space-x-4 md:space-x-6">
        {links.map((link) => (
            <MagneticWrapper key={link.id}>
            <button
                onClick={() => handleScrollTo(link.id)}
                className={`
                  text-xs sm:text-sm md:text-base font-bold transition-all duration-200 uppercase
                  relative group
                `}
                style={{ fontFamily: FONT }}
            >
                {link.label}
                <span className={`
                    absolute bottom-[-5px] left-0 h-2px w-full bg-black transition-transform duration-300
                    ${activeView === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}
                `}></span>
            </button>
            </MagneticWrapper>
        ))}
      </nav>
    </div>
  );
};

// --- SCROLLABLE CONTENT VIEWS ---

const HomeView = ({ onParticleTextReady, mouseX, mouseY, isParticleTextReady }) => (
  <div id="home" className="flex flex-col justify-center items-center min-h-screen pt-14 pb-20 text-center px-4 sm:px-8 lg:px-16 relative bg-white">
    <ParticleTextCanvas onReady={onParticleTextReady} mouseX={mouseX} mouseY={mouseY} /> 
    
    {/* Fallback text that fades out when particles are ready (larger text to match particle size) */}
    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${isParticleTextReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <h1 className="text-[53px] sm:text-[53px] md:text-[107px] lg:text-[155px] font-black leading-tight uppercase z-20 text-black px-4" style={{ fontFamily: FONT }}>
        {PORTFOLIO_DATA.name.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h1>
    </div>
    
    <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 right-0 z-30 px-4">
      <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wider max-w-3xl mx-auto border-t pt-4 sm:pt-6 text-black" style={{ fontFamily: FONT, borderColor: PRIMARY_COLOR }}>
        {PORTFOLIO_DATA.discipline}
      </h2>
    </div>
  </div>
);

const AboutView = () => (
  <div id="about" className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-8 md:px-12 lg:px-16 border-t" style={{ borderColor: PRIMARY_COLOR }}>
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 sm:mb-10 md:mb-12 uppercase" style={{ fontFamily: FONT }}>
        <RevealStagger>
            <span>ABOUT</span>
        </RevealStagger>
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
        <div className="lg:col-span-1 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed space-y-6 sm:space-y-8">
            <RevealStagger delay={0.2}>
                <p className="font-semibold text-xl sm:text-2xl">{PORTFOLIO_DATA.intro_statement}</p>
                <p>{PORTFOLIO_DATA.summary.split('. ')[0]}. {PORTFOLIO_DATA.summary.split('. ')[1]}.</p>
                <p>{PORTFOLIO_DATA.summary.split('. ')[2]}</p>
            </RevealStagger>
        </div>
       
            <RevealStagger delay={0.3}>
                
                    <img src="/hero.webp" alt="" />
               
            </RevealStagger>

    </div>
  </div>
);

const WorkView = ({ setView }) => (
  <div id="work" className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-8 md:px-12 lg:px-16 border-t" style={{ borderColor: PRIMARY_COLOR }}>
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 sm:mb-10 md:mb-12 uppercase" style={{ fontFamily: FONT }}>
        <RevealStagger>
            <span>WORK</span>
        </RevealStagger>
    </h2>
    <div className="space-y-3 sm:space-y-4">
      {PORTFOLIO_DATA.projects.map((project, index) => (
        <RevealStagger key={index} delay={0.1} duration={0.6}>
            <MagneticWrapper>
            <button
              onClick={() => setView({ view: 'project', data: project })}
              className="group w-full text-left py-3 sm:py-4 md:py-5 px-3 -mx-3 border-b border-gray-300 transition-all duration-150 ease-out hover:bg-black hover:text-white rounded-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                <span className="md:col-span-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase" style={{ fontFamily: FONT }}>
                  {project.title}
                </span>
                <span className="md:col-span-4 text-xs sm:text-sm md:text-base font-medium md:text-right transition-colors group-hover:text-white" style={{ fontFamily: MONO_FONT }}>
                  ({project.year})
                </span>
              </div>
            </button>
            </MagneticWrapper>
        </RevealStagger>
      ))}
    </div>
  </div>
);

const ContactView = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div id="contact" className="min-h-[50vh] pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-8 md:px-12 lg:px-16 border-t" style={{ borderColor: PRIMARY_COLOR }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 sm:mb-10 md:mb-12 uppercase" style={{ fontFamily: FONT }}>
                <RevealStagger>
                    <span>CONTACT</span>
                </RevealStagger>
            </h2>
            <div className="space-y-6 sm:space-y-8 max-w-3xl">
                <RevealStagger delay={0.2} duration={0.8}>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase wrap-break-words" style={{ fontFamily: FONT }}>
                        <MagneticWrapper>
                        <a href={`mailto:${PORTFOLIO_DATA.email}`} className="hover:underline hover:bg-black hover:text-white transition-all duration-150 block p-1 -m-1 rounded-md">
                          EMAIL: {PORTFOLIO_DATA.email}
                        </a>
                        </MagneticWrapper>
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase space-y-3 sm:space-y-4" style={{ fontFamily: FONT }}>
                        <MagneticWrapper>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:bg-black hover:text-white transition-all duration-150 block p-1 -m-1 rounded-md">
                          {PORTFOLIO_DATA.github.toUpperCase()}
                        </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline hover:bg-black hover:text-white transition-all duration-150 block p-1 -m-1 rounded-md">
                          {PORTFOLIO_DATA.googleDev.toUpperCase()}
                        </a>
                        </MagneticWrapper>
                    </div>
                </RevealStagger>
            </div>
            
            <footer className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-gray-300 text-xs sm:text-sm font-medium opacity-70" style={{ fontFamily: MONO_FONT }}>
                <RevealStagger delay={0.4}>
                    <span>© {currentYear} {PORTFOLIO_DATA.name.toUpperCase()}</span>
                </RevealStagger>
            </footer>
        </div>
    );
};

const ProjectDetailView = ({ project, setView }) => (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-32 md:pb-40 px-4 sm:px-8 md:px-12 lg:px-16 border-t" style={{ borderColor: PRIMARY_COLOR }}>
        <RevealStagger>
            <MagneticWrapper>
            <button 
                onClick={() => setView({ view: 'work' })} 
                className="text-xs sm:text-sm font-bold mb-6 sm:mb-8 hover:underline uppercase p-1 -m-1 rounded-md"
                style={{ fontFamily: MONO_FONT }}
            >
                &larr; BACK TO ALL PROJECTS
            </button>
            </MagneticWrapper>
        </RevealStagger>

        <RevealStagger delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 uppercase" style={{ fontFamily: FONT }}>
                {project.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 md:mb-12 opacity-80" style={{ fontFamily: FONT }}>
                {project.year}
            </p>
        </RevealStagger>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <div className="lg:col-span-1 border-l pl-3 sm:pl-4" style={{ borderColor: PRIMARY_COLOR }}>
                <RevealStagger delay={0.4}>
                    <h3 className="text-xs sm:text-sm font-bold uppercase mb-3 sm:mb-4" style={{ fontFamily: MONO_FONT }}>
                        Technologies
                    </h3>
                    <ul className="space-y-1 text-sm sm:text-base font-medium" style={{ fontFamily: MONO_FONT }}>
                        {project.tech.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </RevealStagger>
            </div>
            <div className="lg:col-span-2">
                <RevealStagger delay={0.5}>
                    <h3 className="text-xs sm:text-sm font-bold uppercase mb-3 sm:mb-4" style={{ fontFamily: MONO_FONT }}>
                        Project Description
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed">{project.desc}</p>
                </RevealStagger>
            </div>
        </div>
        <div 
            className="mt-12 sm:mt-16 md:mt-20 h-64 sm:h-80 md:h-96 w-full flex items-center justify-center border-2 border-dashed rounded-lg"
            style={{ borderColor: PRIMARY_COLOR, backgroundColor: '#F8F8F8' }}
        >
            <RevealStagger delay={0.6}>
                <span className="text-base sm:text-lg md:text-xl font-medium opacity-50 text-center px-4" style={{ fontFamily: MONO_FONT }}>
                    DETAIL VIEW PLACEHOLDER
                </span>
            </RevealStagger>
        </div>
    </div>
);

const LoadingScreen = ({ isLoading }) => {
    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center transition-opacity duration-1000 ease-in-out
                ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ backgroundColor: PRIMARY_COLOR }}
        >
            <div className="text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest" style={{ color: SECONDARY_COLOR, fontFamily: FONT }}>
                    <RevealStagger>
                        <span>VENKAT.UI</span>
                    </RevealStagger>
                </h1>
                <div className="text-sm sm:text-base font-medium mt-4 tracking-wider" style={{ color: SECONDARY_COLOR, fontFamily: MONO_FONT }}>
                    <RevealStagger delay={0.4}>
                        <div>Loading Interface...</div> 
                    </RevealStagger>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [viewState, setViewState] = useState({ view: 'home', data: null });
  const [isReady, setIsReady] = useState(false); 
  const [isHovering, setIsHovering] = useState(false); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isParticleTextReady, setIsParticleTextReady] = useState(false);
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initial loading screen timer
    if (isReady && isParticleTextReady) return;

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500); 

    return () => clearTimeout(timer);
  }, [isReady, isParticleTextReady]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over any interactive element or the canvas itself
      const target = e.target.closest('button, a, #home canvas');
      setIsHovering(!!target);
    };

    if (window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('mousemove', handleGlobalMouseMove);
    }
    
    return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollY = contentRef.current.scrollTop + 100; 
      const sections = ['home', 'about', 'work', 'contact'];
      
      let currentActive = 'home';
      for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section && section.offsetTop <= scrollY) {
              currentActive = sectionId;
          }
      }
      setActiveSection(currentActive);
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [viewState.view, isParticleTextReady]);

  const handleSetView = ({ view, data = null }) => {
    setViewState({ view, data });
    // REMOVED: This auto-scroll-to-top was causing the navigation bug
//     if (view !== 'project' && contentRef.current) {
//         contentRef.current.scrollTop = 0;
//     }
  };

  const renderContent = () => {
    if (viewState.view === 'project') {
      return <ProjectDetailView project={viewState.data} setView={handleSetView} />;
    }
    
    return (
      <>
        <HomeView onParticleTextReady={setIsParticleTextReady} mouseX={mousePosition.x} mouseY={mousePosition.y} isParticleTextReady={isParticleTextReady} />
        <AboutView />
        <WorkView setView={handleSetView} />
        <ContactView />
      </>
    );
  };

  const currentActiveView = viewState.view === 'project' ? 'work' : activeSection;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Inter:wght@400;700;900&display=swap');
          body, #root {
            background-color: ${SECONDARY_COLOR};
            color: ${PRIMARY_COLOR};
            font-family: ${FONT};
            overflow: hidden; 
            cursor: none;
          }
          @media (hover: none) {
            body { cursor: default; }
          }
          .scroll-smooth {
            scroll-behavior: smooth;
          }
          button, a {
            touch-action: manipulation;
          }
        `}
      </style>
      
      <LoadingScreen isLoading={!isReady || !isParticleTextReady} />
      
      <div className="h-screen w-screen relative opacity-100 transition-opacity duration-1000"
           style={{ opacity: isReady ? 1 : 0 }} 
      >
        
        {/* Custom Cursor is only visible on desktop (hover capable) and after loading */}
        {isReady && window.matchMedia('(hover: hover)').matches && (
            <CustomCursor 
                isHovering={isHovering} 
                mouseX={mousePosition.x} 
                mouseY={mousePosition.y} 
            />
        )}

        {isReady && <FixedHeader activeView={currentActiveView} setView={handleSetView} contentRef={contentRef} viewState={viewState} />}

        <div 
          ref={contentRef}
          className="absolute top-10 sm:top-14 left-0 right-0 bottom-0 overflow-y-auto scroll-smooth"
          style={{ 
            backgroundColor: SECONDARY_COLOR,
            color: PRIMARY_COLOR,
          }}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
}
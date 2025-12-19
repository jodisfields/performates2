import React, { useState, useEffect } from 'react';

interface HeroProps {
  onRegisterClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20, 
        y: (e.clientY / window.innerHeight - 0.5) * 20 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-zinc-950">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]"
          style={{ transform: `translate3d(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px), 0)` }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="reveal active inline-flex items-center gap-2 mb-8 bg-zinc-900/50 border border-zinc-800 px-4 py-1.5 rounded-full">
          <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Next event: Sep 05, 18:00 AEST</span>
        </div>

        <h1 className="reveal active text-[12vw] md:text-[8rem] font-black tracking-tighter leading-[0.9] text-zinc-100 mb-8 uppercase">
          PERFOR<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-indigo-500">MATES.</span>
        </h1>

        <p className="reveal active text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-medium tracking-tight">
          Melbourne's most exclusive meetup for high-spending media buyers, SEO architects, and data analysts. No fluff. Just alpha.
        </p>

        <div className="reveal active flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onRegisterClick}
            className="shadcn-button w-full sm:w-auto px-8 py-4 bg-zinc-100 text-zinc-950 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-white/5"
          >
            Register for access
          </button>
          <div className="flex items-center gap-4 px-6 py-4 rounded-lg text-zinc-500 text-[10px] font-bold uppercase tracking-widest border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
            <i className="fas fa-users text-indigo-500"></i>
            <span>48 spots remaining</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce opacity-20">
        <span className="text-[8px] font-mono tracking-widest uppercase text-zinc-500">Scroll for more</span>
        <i className="fas fa-chevron-down text-xs"></i>
      </div>
    </section>
  );
};

export default Hero;
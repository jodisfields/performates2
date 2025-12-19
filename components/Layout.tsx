
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onRegisterClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onRegisterClick }) => {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30 flex flex-col">
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group backdrop-blur-md bg-zinc-950/20 px-4 py-2 rounded-full border border-white/5 hover:border-white/10 transition-all duration-300">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-100">Performates</span>
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-[9px] font-medium text-zinc-500 tracking-[0.2em] uppercase">
            <span>MELBOURNE</span>
            <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
            <span>2024</span>
          </div>
          <button 
            onClick={onRegisterClick}
            className="text-[9px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 bg-zinc-100 text-zinc-950 rounded-full hover:bg-white transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </nav>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="py-24 border-t border-white/5 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold tracking-[0.5em] uppercase text-zinc-100">Performates</span>
            </div>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest max-w-[280px] leading-relaxed">
              The premier node for Melbourne's performance media elite. Connect with those who spend and scale.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-32">
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Network</span>
              <div className="flex flex-col gap-3 text-[10px] font-medium tracking-wider text-zinc-600">
                <a href="#" className="hover:text-zinc-200 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-zinc-200 transition-colors">Twitter (X)</a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Event</span>
              <div className="flex flex-col gap-3 text-[10px] font-medium tracking-wider text-zinc-600">
                <a href="#" className="hover:text-zinc-200 transition-colors">Schedule</a>
                <a href="#" className="hover:text-zinc-200 transition-colors">Partners</a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Legal</span>
              <div className="flex flex-col gap-3 text-[10px] font-medium tracking-wider text-zinc-600">
                <a href="#" className="hover:text-zinc-200 transition-colors">Privacy</a>
                <a href="#" className="hover:text-zinc-200 transition-colors">TOS</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/[0.03] flex flex-col md:flex-row justify-between gap-6">
          <p className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.3em]">© 2024 PERFORMATES • BUILT FOR MEDIA BUYERS</p>
          <div className="flex items-center gap-4">
             <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.3em]">STATUS: ONLINE</span>
             <div className="w-1.5 h-1.5 bg-green-500/30 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

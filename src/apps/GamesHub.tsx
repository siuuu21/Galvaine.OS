/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Gamepad2, ArrowLeft, ExternalLink, ShieldCheck, Zap, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameSite {
  id: string;
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: string;
  category: 'Full Library' | 'Action' | 'Logic' | 'Classic' | 'IO Games';
  trusted?: boolean;
}

const CLASSIC_SITES: GameSite[] = [
  { id: 'nos', name: 'NES Legacy', url: 'https://jsnes.org', desc: 'Enterprise-grade legacy system emulation.', icon: '📺', color: 'bg-emerald-600', category: 'Classic', trusted: true },
  { id: 'dosbox', name: 'DOS Terminal', url: 'https://js-dos.com/games/', desc: 'Legacy x86 architecture emulation.', icon: '💾', color: 'bg-gray-800', category: 'Classic', trusted: true },
];

export default function GamesHub() {
  const [activeSite, setActiveSite] = useState<GameSite | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeError = () => {
    console.warn(`[GalvaineOS] Content loading failure for: ${activeSite?.name}`);
    setErrorCount(prev => prev + 1);
  };

  const resetSession = () => {
    setIframeLoaded(false);
    setErrorCount(0);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  if (activeSite) {
    return (
      <div className="flex flex-col h-full bg-[#03060c]">
        <div className="h-12 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setActiveSite(null); setIframeLoaded(false); setErrorCount(0); }}
              className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors"
            >
               <ArrowLeft size={16} /> Exit Module
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="text-xs font-black text-white flex items-center gap-2">
              <span className="opacity-40 uppercase tracking-widest text-[9px]">Active:</span> {activeSite.name}
              {iframeLoaded ? (
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck size={12} className="text-blue-500" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-tight">Enterprise Shield</span>
             </div>
             <button 
               onClick={resetSession}
               className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-colors"
             >
               <RefreshCw size={14} />
             </button>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1 border border-white/5">
                <Zap size={12} className="text-yellow-500" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter italic">Boosted</span>
             </div>
          </div>
        </div>
        <div className="flex-1 w-full bg-[#03060c] relative overflow-hidden">
          {!iframeLoaded && errorCount === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#03060c] z-20">
               <div className="w-12 h-12 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin mb-4" />
               <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] font-sans">Connecting to Neural Grid...</div>
            </div>
          )}

          {errorCount > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#03060c] z-30 p-12 text-center">
               <AlertCircle size={48} className="text-red-500/50 mb-6" />
               <h2 className="text-2xl font-black text-white mb-2 italic">Module Unavailable</h2>
               <p className="text-white/40 font-bold max-w-sm mb-8 leading-relaxed">The secure tunnel was interrupted by environmental policies.</p>
               <div className="flex items-center gap-4">
                 <button 
                    onClick={resetSession}
                    className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                 >
                   RETRY
                 </button>
                 <button 
                    onClick={() => setActiveSite(null)}
                    className="px-8 py-3 bg-white/5 border border-white/10 text-white/60 rounded-2xl font-black text-xs transition-all"
                 >
                   BACK
                 </button>
               </div>
            </div>
          )}

          <iframe 
            ref={iframeRef}
            src={activeSite.url} 
            className="w-full h-full border-none"
            title={activeSite.name}
            allow="autoplay; fullscreen; keyboard"
            onLoad={() => setIframeLoaded(true)}
            onError={handleIframeError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 h-full bg-[#03060c] text-white overflow-auto border-t border-white/5">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-16 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-black italic tracking-tighter mb-4 text-gradient">
              Galvaine Emulation
            </h1>
            <p className="text-white/30 text-base font-medium">Enterprise-grade legacy system architecture. Isolated environment.</p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl">
            <Zap className="text-yellow-500" size={24} />
            <div>
              <div className="text-[10px] font-black uppercase text-white/20 tracking-widest">Efficiency</div>
              <div className="text-sm font-black text-blue-400">99.9% NATIVE SPEED</div>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 flex items-center gap-6">
            Core Emulators <div className="h-px flex-1 bg-white/5" />
          </h2>
          <div className="bg-white/5 rounded-[3rem] p-10 border border-white/5 backdrop-blur-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {CLASSIC_SITES.map((site) => (
                  <div key={site.id}>
                    <GameCard site={site} onClick={() => setActiveSite(site)} />
                  </div>
                ))}
             </div>
             
             <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white italic tracking-tight">Enterprise Logic Active</div>
                    <div className="text-[11px] font-bold text-white/30 uppercase mt-1 tracking-tight">Automatic Hardware Mapping Enabled</div>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Status</div>
                  <div className="text-xs font-black text-emerald-500 uppercase tracking-tighter">Verified Link</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function GameCard({ site, onClick }: { site: GameSite, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex items-center gap-8 p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all text-left overflow-hidden"
    >
      <div className={`w-28 h-28 rounded-[2rem] flex items-center justify-center text-6xl ${site.color} text-white shadow-2xl group-hover:rotate-6 transition-all duration-500`}>
        {site.icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{site.category}</div>
          {site.trusted && <div className="text-[9px] font-black uppercase text-blue-400 bg-blue-400/10 px-2.5 py-0.5 rounded-full border border-blue-400/20">Secure</div>}
        </div>
        <h3 className="text-2xl font-black mb-3 text-white tracking-tight italic">{site.name}</h3>
        <p className="text-white/40 text-sm leading-relaxed font-medium">{site.desc}</p>
        <div className="mt-6 flex items-center justify-between">
           <span className="text-[11px] font-black text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest italic uppercase">Engaging Engine</span>
           <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
             <ArrowLeft className="rotate-180" size={18} />
           </div>
        </div>
      </div>
    </motion.button>
  );
}

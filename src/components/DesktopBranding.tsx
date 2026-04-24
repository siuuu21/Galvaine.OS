/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Wifi, Bluetooth, Moon, Sun, ChevronRight } from 'lucide-react';
import React from 'react';

interface DesktopBrandingProps {
  isNightLight: boolean;
  setIsNightLight: (v: boolean) => void;
}

const DesktopBranding = ({ isNightLight, setIsNightLight }: DesktopBrandingProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Background Image - Refined for cinematic realism */}
      <div className="absolute inset-0 bg-[#010204]">
        {/* Crisp fluid shapes mimicking the requested image aesthetic */}
        <div className="absolute top-[5%] right-[-10%] w-[80%] h-[100%] bg-blue-600/[0.03] blur-[140px] rounded-full rotate-45 animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-5%] w-[60%] h-[80%] bg-blue-500/[0.04] blur-[120px] rounded-full -rotate-12" />
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[60%] bg-indigo-500/[0.05] blur-[110px] rounded-full rotate-90" />
        
        {/* Realistic texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>
      
      {/* Dynamic Overlay Gradients for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#010204] via-transparent to-transparent opacity-95" />

      {/* Night Light Overlays */}
      <div className={`absolute inset-0 bg-orange-900/10 mix-blend-color transition-opacity duration-1000 ${isNightLight ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${isNightLight ? 'opacity-100' : 'opacity-0'}`} />

      {/* Main Branding (Top Left) */}
      <div className="absolute top-[18%] left-[8%] z-10 space-y-10 max-w-xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-8"
        >
          <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_100px_rgba(37,99,235,0.15)] relative group-hover:scale-105 transition-transform duration-700">
            <span className="text-6xl font-black text-white italic tracking-tighter drop-shadow-2xl">G</span>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 shadow-inner" />
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent opacity-50" />
          </div>
          <div>
            <h1 className="text-8xl font-black text-white tracking-tighter mb-2 italic drop-shadow-2xl">
              Galvaine.<span className="text-blue-400">OS</span>
            </h1>
            <p className="text-3xl font-bold bg-gradient-to-r from-white/80 via-white/70 to-blue-300 bg-clip-text text-transparent tracking-tight">
              Modern. Secure. <span className="italic">Limitless.</span>
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.8, duration: 1 }}
           className="pl-2 border-l-2 border-blue-500/20"
        >
          <p className="text-white/30 text-xl font-medium italic tracking-wide">
            Designed for everyone. Optimized for you.
          </p>
        </motion.div>
      </div>

      {/* Galvaine Center Widget (Bottom Right) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-[100px] right-[8%] z-10 w-[360px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-2xl pointer-events-auto"
      >
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <span className="text-sm font-black italic">G</span>
              </div>
              <div className="text-base font-black text-white uppercase tracking-tighter italic">Galvaine Center</div>
           </div>
           <ChevronRight size={18} className="text-white/20" />
        </div>
        
        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-8">System Control Panel</p>

        <div className="grid grid-cols-3 gap-6">
           <ControlTile icon={Wifi} label="Wi-Fi" active />
           <ControlTile icon={Bluetooth} label="Bluetooth" active />
           <ControlTile 
             icon={Sun} 
             label="Night" 
             active={isNightLight}
             onClick={() => setIsNightLight(!isNightLight)}
            />
        </div>
      </motion.div>
    </div>
  );
};

const ControlTile = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <div className="flex flex-col items-center gap-3">
    <button 
      onClick={onClick}
      className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-300 active:scale-90 ${
      active ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'
    }`}>
      <Icon size={24} />
    </button>
    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.1em]">{label}</span>
  </div>
);

export default React.memo(DesktopBranding);

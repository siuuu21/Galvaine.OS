/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function GamePix() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#03060c]">
      <div className="h-12 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-xs font-black text-white flex items-center gap-2">
            <span className="opacity-40 uppercase tracking-widest text-[9px]">Platform:</span> GamePix
            {iframeLoaded ? (
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => { setIframeLoaded(false); }}
             className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-colors"
           >
             <RefreshCw size={14} />
           </button>
           <div className="h-4 w-px bg-white/10" />
           <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1">
              <Zap size={12} className="text-blue-500" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter italic">Optimized</span>
           </div>
        </div>
      </div>
      <div className="flex-1 w-full bg-[#03060c] relative overflow-hidden">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#03060c] z-20">
             <div className="w-12 h-12 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin mb-4" />
             <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Direct Neural Link...</div>
          </div>
        )}
        <iframe 
          src="https://www.gamepix.com/" 
          className="w-full h-full border-none"
          onLoad={() => setIframeLoaded(true)}
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen; keyboard"
        />
      </div>
    </div>
  );
}

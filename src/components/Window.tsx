/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState } from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  key?: string | number;
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  theme: 'light' | 'dark';
}

export default function Window({ id, title, children, isMinimized, isMaximized, isActive, zIndex, onClose, onFocus, onMinimize, theme }: WindowProps) {
  const [maxed, setMaxed] = useState(false);
  const dragControls = useDragControls();

  if (isMinimized) return null;

  return (
    <motion.div
      drag={!maxed}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={onFocus}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: maxed ? '100%' : '800px',
        height: maxed ? '100%' : '550px',
        top: maxed ? 0 : '10%',
        left: maxed ? 0 : '15%',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, opacity: { duration: 0.1 } }}
      style={{ zIndex, position: 'absolute' }}
      className={`flex flex-col rounded-2xl overflow-hidden shadow-2xl border ${
        theme === 'dark' 
          ? 'bg-[#1a1a1a]/90 border-white/10 backdrop-blur-3xl text-white' 
          : 'bg-white/90 border-black/5 backdrop-blur-3xl text-gray-900'
      } ${isActive ? 'ring-1 ring-white/20' : 'opacity-95'}`}
    >
      {/* Title Bar */}
      <div 
        className="h-10 flex items-center justify-between px-4 cursor-default select-none bg-black/5"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2">
          {/* Mac-style traffic lights */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setMaxed(!maxed); }}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center group"
            >
              <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
          </div>
          <span className="ml-3 text-xs font-semibold opacity-70 tracking-tight">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

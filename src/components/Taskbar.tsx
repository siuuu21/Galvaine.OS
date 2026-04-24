/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useState, useEffect, memo } from 'react';
import { AppId, WindowState } from '../types.ts';
import { 
  Gamepad2, 
  Power,
  LogOut,
  User,
  Search,
  Wifi,
  Globe,
  ChevronUp,
  BatteryMedium,
  Volume2,
  Monitor,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskbarProps {
  windows: Record<AppId, WindowState>;
  openApp: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
}

const Taskbar = ({ windows, openApp, focusWindow }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isCenterOpen, setIsCenterOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dockIcons = [
    { id: 'games' as AppId, icon: Gamepad2, color: 'bg-blue-700' },
    { id: 'gamepix' as AppId, icon: Gamepad2, color: 'bg-blue-500' },
    { id: 'iospace' as AppId, icon: Gamepad2, color: 'bg-sky-400' },
  ];

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-[580px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] p-10 z-[8001] overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-10 p-6 bg-white/5 rounded-3xl border border-white/5 shadow-inner">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-blue-500/20">U1</div>
               <div>
                 <div className="text-xl font-black text-white tracking-tight leading-none uppercase italic">User 1</div>
                 <div className="text-[10px] font-bold text-white/30 mt-2 uppercase tracking-[0.2em]">Galvaine Elite Enterprise</div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
               {dockIcons.map((app, index) => (
                 <motion.button
                   key={app.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 + index * 0.1 }}
                   onClick={() => { openApp(app.id); setIsStartOpen(false); }}
                   className="flex items-center gap-5 p-5 rounded-[2rem] hover:bg-white/5 transition-all text-white border border-transparent hover:border-white/10 hover:shadow-2xl group active:scale-95"
                 >
                   <div className={`p-4 rounded-2xl text-white ${app.color} group-hover:scale-110 transition-transform shadow-xl`}>
                     <app.icon size={24} />
                   </div>
                   <div className="text-left">
                      <div className="text-sm font-black tracking-tight">{windows[app.id].title}</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase">Local Neural Module</div>
                   </div>
                 </motion.button>
               ))}
            </div>

            <div className="border-t border-white/5 pt-10 flex items-center justify-between px-2">
                <div className="flex gap-4">
                  <button className="p-4 hover:bg-white/5 rounded-2xl text-white/40 transition-colors hover:text-white"><Power size={22} /></button>
                  <button className="p-4 hover:bg-white/5 rounded-2xl text-white/40 transition-colors hover:text-white"><User size={22} /></button>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-white/90 rounded-[1.5rem] text-xs font-black shadow-2xl transition-all active:scale-95 uppercase italic tracking-tighter">
                  <LogOut size={16} /> Sign Out Protocol
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Galvaine Center is integrated into DesktopBranding foreground for image match, 
          but we keep it here as a fallback or toggle state if needed */}

      {/* Main Taskbar Container */}
      <div className="fixed bottom-3 left-0 right-0 h-14 z-[8000] px-3 flex items-center">
        {/* Left Side: Spacer */}
        <div className="flex-1" />

        {/* Center: Main Dock */}
        <div className="h-full px-2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center gap-3 shadow-2xl">
          {/* Start Button */}
          <button 
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`p-2.5 rounded-xl transition-all ${isStartOpen ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'hover:bg-white/10 text-white/80'}`}
          >
            <LayoutDashboard size={20} />
          </button>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors" size={14} />
            <input 
              readOnly
              placeholder="Search Galvaine Hub"
              className="bg-white/5 border border-white/5 rounded-xl py-2 pl-9 pr-4 w-40 text-[10px] font-bold text-white/80 transition-all outline-none cursor-default placeholder:text-white/20"
            />
          </div>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Apps */}
          <div className="flex items-center gap-1">
            {dockIcons.map((app) => {
              const isOpen = windows[app.id].isOpen;
              return (
                <div key={app.id} className="relative group">
                  <button
                    onClick={() => isOpen ? focusWindow(app.id) : openApp(app.id)}
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${isOpen ? 'bg-white/5' : ''}`}
                  >
                    <div className={`p-1.5 rounded-lg text-white shadow-xl ${app.color}`}>
                      <app.icon size={18} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: System Info */}
        <div className="flex-1 flex items-center justify-end">
           <div 
             onClick={() => setIsCenterOpen(!isCenterOpen)}
             className="flex items-center gap-4 px-4 h-11 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl hover:bg-white/5 transition-all text-white cursor-pointer shadow-lg group"
           >
             <div className="flex items-center gap-2 text-white/40 group-hover:text-white/80 transition-colors">
               <ChevronUp size={12} />
               <Wifi size={14} />
               <Volume2 size={14} />
               <BatteryMedium size={14} />
             </div>
             
             <div className="flex flex-col items-end text-white text-[10px] font-black min-w-[70px]">
               <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               <span className="opacity-40 text-[8px] uppercase tracking-tighter whitespace-nowrap">{time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
             </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default memo(Taskbar);

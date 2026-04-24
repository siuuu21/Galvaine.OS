/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, memo } from 'react';
import { AppId, WindowState } from '../types.ts';
import Window from './Window.tsx';
import { Monitor, Globe, Gamepad2 } from 'lucide-react';

// Lazy load apps
const GamesHub = lazy(() => import('../apps/GamesHub.tsx'));
const GamePix = lazy(() => import('../apps/GamePix.tsx'));
const IOSpace = lazy(() => import('../apps/IOSpace.tsx'));

interface DesktopProps {
  windows: Record<AppId, WindowState>;
  activeWindow: AppId | null;
  openApp: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  theme: 'light' | 'dark';
}

const DesktopIcon = memo(({ item, onOpen }: { item: any, onOpen: (id: AppId) => void }) => (
  <button
    onClick={() => onOpen(item.id)}
    className="flex flex-col items-center justify-center gap-1 w-24 h-24 rounded-3xl hover:bg-white/5 transition-all group"
  >
    <div className={`p-4 rounded-[1.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl group-hover:scale-105 group-hover:bg-white/10 group-hover:border-white/20 transition-all ${item.color}`}>
      <item.icon size={28} />
    </div>
    <span className="text-[10px] font-black tracking-widest text-white/40 group-hover:text-white uppercase mt-2 drop-shadow-lg transition-colors">
      {item.label}
    </span>
  </button>
));

const Desktop = ({ windows, activeWindow, openApp, closeWindow, focusWindow, toggleMinimize, theme }: DesktopProps) => {
  const getAppContent = (id: AppId) => {
    return (
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full bg-[#03060c] gap-6">
          <div className="w-12 h-12 border-4 border-white/5 border-t-blue-500 rounded-full animate-spin" />
          <div className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">Synchronizing Neural Module</div>
        </div>
      }>
        {id === 'games' && <GamesHub />}
        {id === 'gamepix' && <GamePix />}
        {id === 'iospace' && <IOSpace />}
      </Suspense>
    );
  };

  const desktopIcons = [
    { id: 'games' as AppId, label: 'Emulators', icon: Gamepad2, color: 'text-blue-500' },
    { id: 'gamepix' as AppId, label: 'GamePix', icon: Gamepad2, color: 'text-blue-400' },
    { id: 'iospace' as AppId, label: 'IO Space', icon: Gamepad2, color: 'text-sky-300' },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-64px)] p-8 overflow-hidden">
      {/* Desktop Grid Icons - Removed to keep only in bar as requested */}
      <div className="grid grid-flow-col grid-rows-[repeat(auto-fill,105px)] gap-y-12 gap-x-8 w-fit h-full relative z-10" />

      {/* Windows Layer */}
      {Object.values(windows).map((win) => (
        win.isOpen && (
          <Window
            key={win.id}
            title={win.title}
            id={win.id}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isActive={activeWindow === win.id}
            zIndex={win.zIndex}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onMinimize={() => toggleMinimize(win.id)}
            theme={theme}
          >
            {getAppContent(win.id)}
          </Window>
        )
      ))}
    </div>
  );
};

export default memo(Desktop);

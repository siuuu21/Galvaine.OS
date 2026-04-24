/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppId, WindowState } from './types.ts';
import Desktop from './components/Desktop.tsx';
import Taskbar from './components/Taskbar.tsx';
import DesktopBranding from './components/DesktopBranding.tsx';

// Lazy load apps for performance
const GamesHub = lazy(() => import('./apps/GamesHub.tsx'));
const GamePix = lazy(() => import('./apps/GamePix.tsx'));
const IOSpace = lazy(() => import('./apps/IOSpace.tsx'));

const INITIAL_WINDOWS: Record<string, WindowState> = {
  games: { id: 'games', title: 'Emulators', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  gamepix: { id: 'gamepix', title: 'GamePix', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  iospace: { id: 'iospace', title: 'IO Space', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
};

export default function App() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS as any);
  const [activeWindow, setActiveWindow] = useState<AppId | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isNightLight, setIsNightLight] = useState(false);
  
  const theme = 'dark'; // Locked to dark mode for consistency

  const openApp = useCallback((id: AppId) => {
    console.log(`[GalvaineOS] Opening app: ${id}`);
    setWindows(prev => {
      const nextZIndex = maxZIndex + 1;
      setMaxZIndex(nextZIndex);
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZIndex }
      };
    });
    setActiveWindow(id);
  }, [maxZIndex]);

  const closeWindow = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindow === id) setActiveWindow(null);
  }, [activeWindow]);

  const toggleMinimize = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized }
    }));
    if (activeWindow === id) setActiveWindow(null);
  }, [activeWindow]);

  const focusWindow = useCallback((id: AppId) => {
    const nextZIndex = maxZIndex + 1;
    setMaxZIndex(nextZIndex);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev, ...prev[id], zIndex: nextZIndex, isMinimized: false }
    }));
    setActiveWindow(id);
  }, [maxZIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden font-sans select-none bg-[#03060c] text-white">
      {/* OS Environment */}
      <DesktopBranding 
        isNightLight={isNightLight}
        setIsNightLight={setIsNightLight}
      />

      <Desktop 
        windows={windows} 
        activeWindow={activeWindow}
        openApp={openApp}
        closeWindow={closeWindow}
        focusWindow={focusWindow}
        toggleMinimize={toggleMinimize}
        theme={theme}
      />

      <Taskbar 
        windows={windows} 
        openApp={openApp}
        focusWindow={focusWindow}
      />
    </div>
  );
}

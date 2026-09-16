import React, { useEffect, useState } from 'react';
import type { OsTheme, WindowConfig, WindowId } from '../../types';

interface TaskbarProps {
  windows: Record<WindowId, WindowConfig>;
  activeWindowId: WindowId | null;
  isStartMenuOpen: boolean;
  theme?: OsTheme;
  onToggleTheme?: () => void;
  onToggleStartMenu: () => void;
  onTaskbarItemClick: (id: WindowId) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  isStartMenuOpen,
  theme = 'xp',
  onToggleTheme,
  onToggleStartMenu,
  onTaskbarItemClick,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const isWin7 = theme === 'win7';

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      setTimeStr(`${h}:${m} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 h-10 z-40 flex items-center justify-between px-0 select-none transition-colors ${
        isWin7
          ? 'bg-[#08182b]/80 backdrop-blur-xl border-t border-white/30 shadow-[0_-2px_12px_rgba(0,10,30,0.6)]'
          : 'bg-gradient-to-b from-[#3a79d8] via-[#245edc] to-[#1941a5] border-t border-[#3f8cf3] shadow-[0_-1px_3px_rgba(0,0,0,0.3)]'
      }`}
    >
      {/* Left side: Start Button & Taskbar Items */}
      <div className="flex items-center h-full min-w-0">
        {isWin7 ? (
          /* Windows 7 Start Orb */
          <button
            id="win7-start-button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStartMenu();
            }}
            className={`relative w-11 h-11 -top-0.5 ml-1.5 rounded-full bg-gradient-to-b from-[#3885db] via-[#1a559e] to-[#0d3466] border-2 border-white/60 shadow-[0_0_10px_rgba(60,150,255,0.7),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center hover:brightness-125 hover:shadow-[0_0_16px_rgba(80,180,255,0.9)] transition-all cursor-pointer ${
              isStartMenuOpen ? 'brightness-90 ring-2 ring-blue-300' : ''
            }`}
            title="Start"
          >
            <div className="w-5 h-5 relative flex items-center justify-center scale-90">
              <div className="w-2.5 h-2.5 bg-[#f25022] absolute top-0 left-0 rounded-xs shadow-xs"></div>
              <div className="w-2.5 h-2.5 bg-[#7fba00] absolute top-0 right-0 rounded-xs shadow-xs"></div>
              <div className="w-2.5 h-2.5 bg-[#00a4ef] absolute bottom-0 left-0 rounded-xs shadow-xs"></div>
              <div className="w-2.5 h-2.5 bg-[#ffb900] absolute bottom-0 right-0 rounded-xs shadow-xs"></div>
            </div>
          </button>
        ) : (
          /* Windows XP Start Button */
          <button
            id="xp-start-button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStartMenu();
            }}
            className={`h-full px-4 rounded-r-[14px] bg-gradient-to-b from-[#5ca738] via-[#3d9134] to-[#24701d] hover:from-[#6dc043] hover:to-[#2e8825] border-t border-l border-[#82db7e] border-r border-[#1a5513] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.4),2px_0_4px_rgba(0,0,0,0.3)] flex items-center gap-2 cursor-pointer ${
              isStartMenuOpen ? 'brightness-90 shadow-inner' : ''
            }`}
          >
            <div className="w-5 h-5 relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#e04343] absolute top-0 left-0 rounded-[2px]"></div>
              <div className="w-2.5 h-2.5 bg-[#5ca738] absolute top-0 right-0 rounded-[2px]"></div>
              <div className="w-2.5 h-2.5 bg-[#0055ea] absolute bottom-0 left-0 rounded-[2px]"></div>
              <div className="w-2.5 h-2.5 bg-[#ffddb5] absolute bottom-0 right-0 rounded-[2px]"></div>
            </div>
            <span className="font-headline-sm text-headline-sm italic text-on-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pr-1">
              start
            </span>
          </button>
        )}

        {/* Running Window Tabs */}
        <div className="h-full flex items-center px-space-sm gap-space-xs overflow-x-auto min-w-0">
          {openWindows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => onTaskbarItemClick(win.id)}
                className={`h-[28px] px-space-md rounded flex items-center gap-space-xs cursor-pointer transition-all ${
                  isWin7
                    ? isActive
                      ? 'bg-white/30 border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_8px_rgba(120,180,255,0.6)] text-white'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 shadow-xs'
                    : isActive
                    ? 'bg-[#1a3fa0] border-t border-l border-[#122b6e] border-b border-r border-[#3a67d8] shadow-inner text-white'
                    : 'bg-primary-container/80 hover:bg-primary-container border-t border-l border-[#598bee] border-b border-r border-[#15347e] shadow-sm text-on-primary'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] shrink-0 ${isWin7 ? 'text-[#82db7e]' : 'text-[#82db7e]'}`}>
                  {win.icon}
                </span>
                <span className="font-body-sm text-body-sm truncate max-w-[140px]">
                  {win.title.split('—')[0].replace('C:\\Ali\\Portfolio\\', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: System Tray & Clock */}
      <div
        className={`h-full flex items-center px-space-md gap-space-md shrink-0 ${
          isWin7
            ? 'bg-white/5 border-l border-white/20 text-white'
            : 'bg-gradient-to-b from-[#0c59b2] to-[#16469d] border-l border-[#133c82] text-on-primary shadow-inner'
        }`}
      >
        {/* Style Switcher in Tray */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-all text-[11px] font-bold ${
              isWin7
                ? 'bg-white/20 hover:bg-white/35 border border-white/40 text-white'
                : 'bg-primary-container/60 hover:bg-primary-container border border-[#598bee] text-on-primary'
            }`}
            title={`Current theme: ${isWin7 ? 'Windows 7 Aero' : 'Windows XP Luna'}. Click to switch!`}
          >
            <span className="material-symbols-outlined text-[14px]">palette</span>
            <span>{isWin7 ? 'Win 7' : 'XP'}</span>
          </button>
        )}

        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary-container" title="Network Connected">
            lan
          </span>
          <span className="material-symbols-outlined text-[16px]" title="Master Volume">
            volume_up
          </span>
          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed" title="Protected by Platform Security">
            security
          </span>
        </div>
        <div className="w-[1px] h-5 bg-white/20"></div>
        <div className="font-label-sm text-label-sm tracking-wider font-mono">
          <span id="xp-live-clock">{timeStr || '10:42 AM'}</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border border-primary-fixed/40 shadow-inner">
          <span className="material-symbols-outlined text-on-primary text-[14px]">person</span>
        </div>
      </div>
    </footer>
  );
};

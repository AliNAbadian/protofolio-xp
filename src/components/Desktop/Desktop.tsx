import React, { useState } from 'react';
import { desktopIcons } from '../../data/portfolioData';
import type { WindowId } from '../../types';

interface DesktopProps {
  onOpenWindow: (id: WindowId) => void;
  children: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = ({ onOpenWindow, children }) => {
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.desktop-icon')) {
      setSelectedIcon(null);
    }
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('.xp-window') ||
      (e.target as HTMLElement).closest('#xp-start-menu') ||
      (e.target as HTMLElement).closest('footer')
    ) {
      return;
    }
    e.preventDefault();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 150);
    setContextMenu({ x, y });
  };

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className="relative h-screen w-screen overflow-hidden select-none bg-surface font-body-md text-on-surface"
    >
      {/* XP Bliss Wallpaper Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2470d8] via-[#5999ec] to-[#70a938] flex flex-col justify-between pointer-events-none z-0">
        <div className="w-full h-1/2 bg-gradient-to-b from-[#1b58b8] to-transparent opacity-40"></div>
        <div className="w-full h-1/2 bg-gradient-to-t from-[#488e1a] via-[#75b829] to-transparent opacity-90"></div>
      </div>

      {/* Left Quick-Access Dock */}
      <aside className="fixed left-0 top-0 bottom-10 w-24 z-10 flex flex-col items-center py-space-md gap-space-md pointer-events-auto">
        <div
          onClick={() => onOpenWindow('win-projects')}
          className="flex flex-col items-center gap-space-xs p-space-xs rounded hover:bg-primary-fixed/20 cursor-pointer group w-20 text-center transition-all"
        >
          <div className="w-9 h-9 rounded bg-primary-container shadow-md flex items-center justify-center border-t border-l border-surface-container-lowest border-b border-r border-outline">
            <span className="material-symbols-outlined text-on-primary text-[24px]">folder_shared</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-container-lowest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            My Projects
          </span>
        </div>

        <div
          onClick={() => onOpenWindow('win-terminal')}
          className="flex flex-col items-center gap-space-xs p-space-xs rounded hover:bg-primary-fixed/20 cursor-pointer group w-20 text-center transition-all"
        >
          <div className="w-9 h-9 rounded bg-tertiary-container shadow-md flex items-center justify-center border-t border-l border-surface-container-lowest border-b border-r border-outline">
            <span className="material-symbols-outlined text-on-tertiary text-[24px]">terminal</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-container-lowest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            CLI Shell
          </span>
        </div>

        <div
          onClick={() => onOpenWindow('win-resume')}
          className="flex flex-col items-center gap-space-xs p-space-xs rounded hover:bg-primary-fixed/20 cursor-pointer group w-20 text-center transition-all"
        >
          <div className="w-9 h-9 rounded bg-secondary shadow-md flex items-center justify-center border-t border-l border-surface-container-lowest border-b border-r border-outline">
            <span className="material-symbols-outlined text-on-secondary text-[24px]">description</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-container-lowest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Resume.pdf
          </span>
        </div>

        <div
          onClick={() => onOpenWindow('win-recycle')}
          className="flex flex-col items-center gap-space-xs p-space-xs rounded hover:bg-primary-fixed/20 cursor-pointer group w-20 text-center transition-all"
        >
          <div className="w-9 h-9 rounded bg-surface-container-highest shadow-md flex items-center justify-center border-t border-l border-surface-container-lowest border-b border-r border-outline">
            <span className="material-symbols-outlined text-on-surface text-[24px]">delete</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-container-lowest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Recycle Bin
          </span>
        </div>
      </aside>

      {/* Main Desktop Area */}
      <main className="relative z-10 w-full h-[calc(100vh-40px)] pl-24 pr-4 py-3 overflow-hidden">
        {/* Desktop Icons Grid */}
        <div
          id="desktop-grid"
          className="absolute inset-0 p-space-md pl-26 grid grid-flow-col grid-rows-6 gap-y-3 gap-x-4 w-max pointer-events-auto z-10"
        >
          {desktopIcons.map((icon) => {
            const isSelected = selectedIcon === icon.id;
            return (
              <div
                key={icon.id}
                data-window={icon.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIcon(icon.id);
                }}
                onDoubleClick={() => onOpenWindow(icon.id)}
                className={`desktop-icon group flex flex-col items-center justify-center w-[76px] h-[72px] rounded cursor-pointer p-1 transition-all ${
                  isSelected ? 'bg-primary-container/30 ring-1 ring-primary-fixed' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${icon.bgClass} backdrop-blur-sm shadow-sm`}
                >
                  <span
                    className={`material-symbols-outlined text-[30px] ${icon.textColorClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
                  >
                    {icon.icon}
                  </span>
                </div>
                <span className="icon-label font-body-sm text-body-sm text-surface-container-lowest text-center leading-tight mt-1 px-1 rounded drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-w-[74px]">
                  {icon.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Windows and modals */}
        {children}
      </main>

      {/* Right-Click Desktop Context Menu */}
      {contextMenu && (
        <div
          id="xp-context-menu"
          className="absolute z-50 w-48 rounded bg-surface-container-lowest shadow-xl border border-outline-variant py-1 font-body-sm text-body-sm text-on-surface flex flex-col"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <div
            onClick={() => {
              alert('Icons arranged by importance.');
              setContextMenu(null);
            }}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">sort</span> Arrange Icons
          </div>
          <div
            onClick={() => {
              window.location.reload();
              setContextMenu(null);
            }}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span> Refresh Desktop
          </div>
          <div className="h-[1px] bg-surface-container my-1"></div>
          <div
            onClick={() => {
              onOpenWindow('win-about');
              setContextMenu(null);
            }}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">info</span> System Properties
          </div>
          <div
            onClick={() => {
              onOpenWindow('win-ailab');
              setContextMenu(null);
            }}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">neurology</span> Launch AI Lab
          </div>
        </div>
      )}
    </div>
  );
};

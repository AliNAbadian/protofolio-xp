import React, { useRef, useState } from 'react';
import { desktopIcons } from '../../data/portfolioData';
import type { WindowId } from '../../types';

interface DesktopProps {
  onOpenWindow: (id: WindowId) => void;
  children: React.ReactNode;
}

interface DragState {
  id: string;
  startX: number;
  startY: number;
  initX: number;
  initY: number;
  moved: boolean;
}

const getDefaultIconPos = (index: number) => {
  const col = Math.floor(index / 6);
  const row = index % 6;
  return { x: 108 + col * 88, y: 16 + row * 84 };
};

const getInitialPositions = (): Record<string, { x: number; y: number }> => {
  const defaults: Record<string, { x: number; y: number }> = {};
  desktopIcons.forEach((icon, i) => {
    defaults[icon.id] = getDefaultIconPos(i);
  });
  const saved = localStorage.getItem('xp_desktop_icon_positions');
  if (saved) {
    try {
      return { ...defaults, ...JSON.parse(saved) };
    } catch {}
  }
  return defaults;
};

export const Desktop: React.FC<DesktopProps> = ({ onOpenWindow, children }) => {
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(getInitialPositions);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  const dragRef = useRef<DragState | null>(null);
  const justDraggedRef = useRef(false);

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
    const y = Math.min(e.clientY, window.innerHeight - 180);
    setContextMenu({ x, y });
  };

  const handleIconPointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const current = positions[id] || getDefaultIconPos(desktopIcons.findIndex((i) => i.id === id));
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: current.x,
      initY: current.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleIconPointerMove = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.moved && Math.hypot(dx, dy) > 3) {
      drag.moved = true;
      setDraggingId(id);
      setSelectedIcon(id as WindowId);
    }

    if (drag.moved) {
      const newX = Math.max(0, Math.min(window.innerWidth - 80, drag.initX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 120, drag.initY + dy));
      setPositions((prev) => {
        const next = { ...prev, [id]: { x: newX, y: newY } };
        positionsRef.current = next;
        return next;
      });
    }
  };

  const handleIconPointerUp = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (drag.moved) {
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 100);
      localStorage.setItem('xp_desktop_icon_positions', JSON.stringify(positionsRef.current));
    } else {
      setSelectedIcon(id as WindowId);
    }

    setDraggingId(null);
    dragRef.current = null;
  };

  const arrangeIcons = () => {
    const defaults: Record<string, { x: number; y: number }> = {};
    desktopIcons.forEach((icon, i) => {
      defaults[icon.id] = getDefaultIconPos(i);
    });
    setPositions(defaults);
    positionsRef.current = defaults;
    localStorage.setItem('xp_desktop_icon_positions', JSON.stringify(defaults));
    setContextMenu(null);
  };

  const alignToGrid = () => {
    setPositions((prev) => {
      const aligned: Record<string, { x: number; y: number }> = {};
      Object.entries(prev).forEach(([id, pos]) => {
        const snappedX = Math.max(0, Math.round((pos.x - 20) / 88) * 88 + 20);
        const snappedY = Math.max(0, Math.round((pos.y - 16) / 84) * 84 + 16);
        aligned[id] = { x: snappedX, y: snappedY };
      });
      positionsRef.current = aligned;
      localStorage.setItem('xp_desktop_icon_positions', JSON.stringify(aligned));
      return aligned;
    });
    setContextMenu(null);
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
      <main className="relative z-10 w-full h-[calc(100vh-40px)] overflow-hidden">
        {/* Desktop Icons */}
        <div id="desktop-grid" className="absolute inset-0 pointer-events-none z-10">
          {desktopIcons.map((icon, idx) => {
            const isSelected = selectedIcon === icon.id;
            const isDragging = draggingId === icon.id;
            const pos = positions[icon.id] || getDefaultIconPos(idx);

            return (
              <div
                key={icon.id}
                data-window={icon.id}
                onPointerDown={(e) => handleIconPointerDown(icon.id, e)}
                onPointerMove={(e) => handleIconPointerMove(icon.id, e)}
                onPointerUp={(e) => handleIconPointerUp(icon.id, e)}
                onPointerCancel={(e) => handleIconPointerUp(icon.id, e)}
                onDoubleClick={() => {
                  if (justDraggedRef.current) return;
                  onOpenWindow(icon.id);
                }}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                  touchAction: 'none',
                  zIndex: isDragging ? 35 : isSelected ? 15 : 10,
                }}
                className={`desktop-icon group absolute top-0 left-0 flex flex-col items-center justify-center w-[76px] h-[72px] rounded p-1 transition-shadow pointer-events-auto select-none ${
                  isDragging ? 'cursor-grabbing opacity-80 shadow-2xl scale-105' : 'cursor-pointer'
                } ${
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
            onClick={arrangeIcons}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">sort</span> Auto Arrange Icons
          </div>
          <div
            onClick={alignToGrid}
            className="px-space-md py-1 hover:bg-primary hover:text-on-primary cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span> Align to Grid
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

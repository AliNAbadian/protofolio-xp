import React, { useRef } from 'react';
import type { OsTheme, WindowConfig } from '../../types';

interface XpWindowProps {
  config: WindowConfig;
  theme?: OsTheme;
  titlebarGradient?: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange: (newPos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const XpWindow: React.FC<XpWindowProps> = ({
  config,
  theme = 'xp',
  titlebarGradient = 'from-primary via-primary-container to-primary',
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  children,
}) => {
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    onFocus();
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - config.position.x,
      y: e.clientY - config.position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, moveEvent.clientX - dragOffsetRef.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, moveEvent.clientY - dragOffsetRef.current.y));
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!config.isOpen || config.isMinimized) return null;

  const isWin7 = theme === 'win7';

  return (
    <div
      id={config.id}
      onMouseDown={onFocus}
      className={`xp-window absolute flex flex-col overflow-hidden transition-all ${
        isWin7
          ? 'rounded-lg border border-white/50 bg-[#f4f7fb]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,10,30,0.55)]'
          : 'rounded-t-lg bg-surface-container-high shadow-2xl'
      }`}
      style={{
        left: `${config.position.x}px`,
        top: `${config.position.y}px`,
        width: config.width || 'auto',
        maxWidth: config.maxWidth || '600px',
        height: config.height || 'auto',
        zIndex: config.zIndex,
        boxShadow: isWin7 ? '0 16px 48px rgba(0, 15, 45, 0.6), inset 0 1px 1px rgba(255,255,255,0.7)' : '0 12px 36px rgba(0, 20, 60, 0.45)',
      }}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        className={`window-titlebar flex items-center justify-between px-space-sm cursor-move select-none ${
          isWin7
            ? 'h-8 bg-gradient-to-b from-white/60 via-white/20 to-transparent border-b border-white/40'
            : `h-7 bg-gradient-to-r ${titlebarGradient}`
        }`}
      >
        <div className="flex items-center gap-space-xs overflow-hidden pr-2">
          <span className={`material-symbols-outlined text-[16px] shrink-0 ${isWin7 ? 'text-primary' : 'text-surface-container-lowest'}`}>
            {config.icon}
          </span>
          <span
            className={`truncate ${
              isWin7
                ? 'font-bold text-[13px] text-[#1a2b42] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'
                : 'font-titlebar text-titlebar text-surface-container-lowest drop-shadow'
            }`}
          >
            {config.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            title="Minimize"
            className={
              isWin7
                ? 'w-7 h-5 rounded-b bg-white/30 hover:bg-white/60 text-slate-800 border border-white/50 shadow-xs flex items-center justify-center font-bold text-xs cursor-pointer'
                : 'win-btn-minimize w-5 h-4 bg-primary text-surface-container-lowest font-body-sm rounded-sm flex items-center justify-center hover:bg-primary-container shadow-inner cursor-pointer'
            }
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
            className={
              isWin7
                ? 'w-10 h-5 rounded-b bg-[#e81123]/80 hover:bg-[#e81123] text-white border border-[#e81123]/50 shadow-xs flex items-center justify-center font-bold text-xs cursor-pointer'
                : 'win-btn-close w-5 h-4 bg-error text-surface-container-lowest font-body-sm rounded-sm flex items-center justify-center hover:bg-on-error-container shadow-inner cursor-pointer'
            }
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
    </div>
  );
};

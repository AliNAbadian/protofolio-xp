import React, { useRef } from 'react';
import type { WindowConfig } from '../../types';

interface XpWindowProps {
  config: WindowConfig;
  titlebarGradient?: string;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange: (newPos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const XpWindow: React.FC<XpWindowProps> = ({
  config,
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

  return (
    <div
      id={config.id}
      onMouseDown={onFocus}
      className="xp-window absolute rounded-t-lg shadow-2xl bg-surface-container-high flex flex-col overflow-hidden transition-shadow"
      style={{
        left: `${config.position.x}px`,
        top: `${config.position.y}px`,
        width: config.width || 'auto',
        maxWidth: config.maxWidth || '600px',
        height: config.height || 'auto',
        zIndex: config.zIndex,
        boxShadow: '0 12px 36px rgba(0, 20, 60, 0.45)',
      }}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        className={`window-titlebar h-7 bg-gradient-to-r ${titlebarGradient} flex items-center justify-between px-space-sm cursor-move select-none`}
      >
        <div className="flex items-center gap-space-xs overflow-hidden pr-2">
          <span className="material-symbols-outlined text-surface-container-lowest text-[16px] shrink-0">
            {config.icon}
          </span>
          <span className="font-titlebar text-titlebar text-surface-container-lowest drop-shadow truncate">
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
            className="win-btn-minimize w-5 h-4 bg-primary text-surface-container-lowest font-body-sm rounded-sm flex items-center justify-center hover:bg-primary-container shadow-inner cursor-pointer"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close"
            className="win-btn-close w-5 h-4 bg-error text-surface-container-lowest font-body-sm rounded-sm flex items-center justify-center hover:bg-on-error-container shadow-inner cursor-pointer"
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

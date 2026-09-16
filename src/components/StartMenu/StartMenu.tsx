import React from 'react';
import type { OsTheme, WindowId } from '../../types';

interface StartMenuProps {
  isOpen: boolean;
  theme?: OsTheme;
  onToggleTheme?: () => void;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  theme = 'xp',
  onToggleTheme,
  onClose,
  onOpenWindow,
}) => {
  if (!isOpen) return null;
  const isWin7 = theme === 'win7';

  const handleItemClick = (id: WindowId) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <div
      id="xp-start-menu"
      onClick={(e) => e.stopPropagation()}
      className={`fixed left-0 bottom-10 z-50 w-[420px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100 ${
        isWin7
          ? 'rounded-t-2xl bg-[#08182b]/90 backdrop-blur-2xl border-t border-l border-r border-white/40 shadow-[0_0_40px_rgba(0,10,30,0.85)] text-white'
          : 'rounded-t-lg shadow-[2px_2px_16px_rgba(0,0,0,0.55)] border-t-2 border-l-2 border-primary-container border-r-2 border-outline-variant bg-surface-container-lowest'
      }`}
    >
      {/* Start Menu Header */}
      <div className="h-14 bg-gradient-to-r from-primary via-primary-container to-primary-fixed-dim px-space-md flex items-center justify-between border-b border-primary-container">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded border border-surface-container-lowest bg-surface-container p-[2px] shadow-inner">
            <div className="w-full h-full rounded-sm bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[22px]">person</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-primary drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Ali N. Abadian
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed">
              Senior Frontend Platform Engineer
            </span>
          </div>
        </div>
      </div>

      {/* Two Columns Body */}
      <div className="flex min-h-[380px]">
        {/* Left Column (White) */}
        <div className="w-7/12 bg-surface-container-lowest p-space-sm flex flex-col justify-between border-r border-outline-variant">
          <nav className="flex flex-col gap-space-xs">
            <button
              onClick={() => handleItemClick('win-ie')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-primary group-hover:text-on-primary-container">
                public
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container font-bold">
                Internet Explorer
              </span>
            </button>

            <button
              onClick={() => handleItemClick('win-welcome')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-primary group-hover:text-on-primary-container">
                badge
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container">
                Overview &amp; Bio
              </span>
            </button>

            <button
              onClick={() => handleItemClick('win-projects')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary group-hover:text-on-primary-container">
                laptop_mac
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container">
                Key Projects
              </span>
            </button>

            <button
              onClick={() => handleItemClick('win-resume')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary group-hover:text-on-primary-container">
                work_history
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container">
                Work History
              </span>
            </button>

            <button
              onClick={() => handleItemClick('win-ailab')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-primary group-hover:text-on-primary-container">
                developer_board
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container">
                Frontend Arch Lab
              </span>
            </button>

            <button
              onClick={() => handleItemClick('win-terminal')}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded transition-all hover:bg-primary-container hover:text-on-primary-container text-left cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-on-primary-container">
                terminal
              </span>
              <span className="font-body-md text-body-md text-on-surface group-hover:text-on-primary-container">
                Interactive Shell
              </span>
            </button>
          </nav>

          <div className="pt-space-xs border-t border-outline-variant">
            <button
              onClick={() => handleItemClick('win-welcome')}
              className="w-full flex items-center justify-center gap-space-xs font-label-md text-label-md py-space-xs text-on-surface hover:bg-surface-container-high rounded cursor-pointer"
            >
              <span>All Programs</span>
              <span className="material-symbols-outlined text-[14px]">arrow_right</span>
            </button>
          </div>
        </div>

        {/* Right Column (Light Blue/Cream) */}
        <div className="w-5/12 bg-surface-container-low p-space-sm flex flex-col gap-space-xs">
          <button
            onClick={() => handleItemClick('win-projects')}
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded text-on-surface hover:bg-surface-container-highest text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">folder</span>
            <span className="font-body-sm text-body-sm font-bold">My Documents</span>
          </button>

          <button
            onClick={() => handleItemClick('win-about')}
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded text-on-surface hover:bg-surface-container-highest text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">devices</span>
            <span className="font-body-sm text-body-sm font-bold">My System</span>
          </button>

          <button
            onClick={() => handleItemClick('win-skills')}
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded text-on-surface hover:bg-surface-container-highest text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">settings</span>
            <span className="font-body-sm text-body-sm font-bold">Control Panel</span>
          </button>

          {/* Theme switcher button in Start Menu */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-space-sm px-space-sm py-space-xs rounded bg-primary-container/20 hover:bg-primary-container/40 text-left cursor-pointer border border-primary/30"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
              <span className="font-body-sm text-body-sm font-bold">
                Theme: {isWin7 ? 'Win 7 Aero' : 'XP Luna'}
              </span>
            </button>
          )}

          <div className="h-[1px] bg-outline-variant my-space-xs"></div>

          <button
            onClick={() => handleItemClick('win-about')}
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded text-on-surface hover:bg-surface-container-highest text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">help</span>
            <span className="font-body-sm text-body-sm">Help and Support</span>
          </button>

          <button
            onClick={() => handleItemClick('win-projects')}
            className="flex items-center gap-space-sm px-space-sm py-space-xs rounded text-on-surface hover:bg-surface-container-highest text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">search</span>
            <span className="font-body-sm text-body-sm">Search Files</span>
          </button>
        </div>
      </div>

      {/* Footer Log Off / Turn Off */}
      <div
        className={`h-11 px-space-md flex items-center justify-between ${
          isWin7
            ? 'bg-[#08182b]/80 border-t border-white/20'
            : 'bg-gradient-to-r from-primary to-primary-container'
        }`}
      >
        {isWin7 ? (
          <div className="flex-1 mr-3 flex items-center bg-white/10 border border-white/30 rounded px-2 py-1 text-xs text-white">
            <span className="material-symbols-outlined text-[14px] text-white/60 mr-1.5">search</span>
            <span className="text-white/60 italic text-[11px]">Search programs and files</span>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Logging off developer session...')}
            className="flex items-center gap-space-xs text-on-primary hover:bg-white/20 px-space-sm py-1 rounded cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span className="font-label-sm text-label-sm">Log Off</span>
          </button>
          <button
            onClick={() => alert('Shutdown Ali OS...')}
            className="flex items-center gap-space-xs text-on-primary bg-error/70 hover:bg-error px-space-sm py-1 rounded cursor-pointer text-xs shadow-xs font-bold"
          >
            <span className="material-symbols-outlined text-[15px]">power_settings_new</span>
            <span className="font-label-sm text-label-sm">{isWin7 ? 'Shut down' : 'Turn Off'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

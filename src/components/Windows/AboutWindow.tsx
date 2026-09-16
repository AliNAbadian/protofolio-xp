import React, { useState } from 'react';
import type { WindowId } from '../../types';

interface AboutWindowProps {
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onClose, onOpenWindow }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'arch' | 'hw'>('general');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-container-lowest">
      {/* Tabs */}
      <div className="px-space-sm pt-2 bg-surface-container-high flex items-center gap-1 border-b border-outline-variant/30 text-[12px]">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-space-md py-1 rounded-t font-label-md text-label-md cursor-pointer transition-colors ${activeTab === 'general'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-low'
            }`}
        >
          General~
        </button>
        <button
          onClick={() => {
            setActiveTab('arch');
            alert('Architecture tab: Modular Rspack Federation & Feature-Sliced Design.');
          }}
          className={`px-space-md py-1 rounded-t font-label-md text-label-md cursor-pointer transition-colors ${activeTab === 'arch'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-low'
            }`}
        >
          Architecture
        </button>
        <button
          onClick={() => {
            setActiveTab('hw');
            alert('Hardware: Tabriz Remote Workstation, dual high-refresh displays, fiber uplink.');
          }}
          className={`px-space-md py-1 rounded-t font-label-md text-label-md cursor-pointer transition-colors ${activeTab === 'hw'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-low'
            }`}
        >
          Hardware
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-md">
        <div className="flex items-start gap-space-md">
          <div className="w-14 h-14 rounded bg-primary-fixed flex items-center justify-center shrink-0 shadow">
            <span className="material-symbols-outlined text-on-primary-fixed-variant text-[32px]">
              desktop_windows
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              Ali N. Abadian OS
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Version 2025 (Service Pack 2)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface mt-1">
              Senior Frontend Platform Engineer
            </span>
          </div>
        </div>

        <div className="p-space-sm bg-surface-container-low rounded-lg shadow-inner flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface border border-outline-variant/20">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-bold">Location:</span>
            <span>Tabriz, Iran (Available Globally Remote)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-bold">Core Processor:</span>
            <span>React 19 • TypeScript 5.x • Next.js</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-bold">State Architecture:</span>
            <span>Zustand • TanStack Query • Redux</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-bold">Build &amp; Federation:</span>
            <span>Rspack • Module Federation • Vite</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-bold">Next-Gen Frontier:</span>
            <span>MCP Tools • Generative UI • WebGL</span>
          </div>
        </div>

        <div className="flex justify-end gap-space-sm pt-space-xs">
          <button
            onClick={() => onOpenWindow('win-contact')}
            className="px-space-md py-1 bg-primary text-on-primary rounded font-label-md text-label-md shadow hover:bg-primary-container cursor-pointer"
          >
            Contact Ali
          </button>
          <button
            onClick={onClose}
            className="px-space-md py-1 bg-surface-container text-on-surface rounded font-label-md text-label-md shadow hover:bg-surface-container-high cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

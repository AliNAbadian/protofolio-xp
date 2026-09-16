import React from 'react';
import type { WindowId } from '../../types';

interface WelcomeWindowProps {
  onOpenWindow: (id: WindowId) => void;
}

export const WelcomeWindow: React.FC<WelcomeWindowProps> = ({ onOpenWindow }) => {
  return (
    <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-md">
      {/* Header Profile Info */}
      <div className="flex items-start gap-space-md">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary-container flex items-center justify-center p-1 shadow-md shrink-0">
          <span className="material-symbols-outlined text-on-primary text-[38px]">
            devices_other
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">
            Ali N. Abadian
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-bold uppercase tracking-wider">
            Senior Frontend Developer &amp; Platform Architect
          </span>
          <p className="font-body-md text-body-md text-on-surface mt-1 leading-relaxed">
            Specializing in high-throughput enterprise SaaS, micro-frontend platforms, WebGL geospatial clustering, and AI-native Generative UI pipelines.
          </p>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-3 gap-space-xs p-space-xs bg-surface-container-low rounded-lg shadow-inner text-center">
        <div className="p-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Experience</span>
          <span className="font-headline-sm text-headline-sm text-primary font-bold">6+ Yrs</span>
        </div>
        <div className="p-space-xs border-x-0 bg-surface-container-lowest/60 rounded">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Architecture</span>
          <span className="font-headline-sm text-headline-sm text-secondary font-bold">Modular</span>
        </div>
        <div className="p-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">AI Integration</span>
          <span className="font-headline-sm text-headline-sm text-tertiary font-bold">MCP Native</span>
        </div>
      </div>

      {/* Footer Details & Actions */}
      <div className="flex items-center justify-between pt-space-xs">
        <span className="font-code-sm text-code-sm text-outline">v2025.4.1 [Tabriz / Remote]</span>
        <div className="flex items-center gap-space-xs">
          <button
            onClick={() => onOpenWindow('win-projects')}
            className="px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high font-label-md text-label-md shadow-sm active:shadow-inner text-on-surface cursor-pointer"
          >
            Explore Projects
          </button>
          <button
            onClick={() => onOpenWindow('win-ailab')}
            className="px-space-md py-space-xs rounded bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md shadow-md active:shadow-inner cursor-pointer"
          >
            Launch AI Lab
          </button>
        </div>
      </div>
    </div>
  );
};

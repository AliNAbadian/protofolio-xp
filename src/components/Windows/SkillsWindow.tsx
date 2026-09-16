import React from 'react';

export const SkillsWindow: React.FC = () => {
  return (
    <div className="flex-1 p-space-md bg-surface-container-lowest overflow-y-auto flex flex-col gap-space-md min-h-0">
      {/* Diagnostic Banner */}
      <div className="bg-surface-container-low p-space-sm rounded shadow-sm border border-outline-variant/30">
        <span className="font-label-sm text-label-sm text-outline uppercase font-bold">
          Diagnostic Status
        </span>
        <div className="font-headline-sm text-headline-sm text-secondary flex items-center gap-1 mt-0.5 font-bold">
          <span className="material-symbols-outlined text-[20px]">task_alt</span> All Frontend
          Drivers Operating at Peak Performance
        </div>
      </div>

      {/* Category Clusters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
        {/* Frontend Core */}
        <div className="p-space-sm bg-surface-container rounded shadow-sm border border-outline-variant/20">
          <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">code</span> Core UI &amp; Runtime
          </span>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              React 19
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              TypeScript
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Next.js App Router
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Tailwind CSS
            </span>
          </div>
        </div>

        {/* Architecture & Infra */}
        <div className="p-space-sm bg-surface-container rounded shadow-sm border border-outline-variant/20">
          <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">account_tree</span> Architecture
            &amp; Bundling
          </span>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Module Federation
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Rspack / Rsbuild
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Micro-Frontends
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              FSD Methodology
            </span>
          </div>
        </div>

        {/* Geospatial & Performance */}
        <div className="p-space-sm bg-surface-container rounded shadow-sm border border-outline-variant/20">
          <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">map</span> Maps &amp; Geospatial
          </span>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              MapLibre GL
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              WebGL Shaders
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              OSRM Routing
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              GeoJSON Spatial
            </span>
          </div>
        </div>

        {/* AI & Modern Frontier */}
        <div className="p-space-sm bg-surface-container rounded shadow-sm border border-outline-variant/20">
          <span className="font-label-md text-label-md text-tertiary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span> AI &amp;
            Generative UI
          </span>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Model Context Protocol (MCP)
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              Generative UI Components
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-code-sm text-code-sm shadow-inner">
              LangChain / Agent UI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

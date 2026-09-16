import React from 'react';

export const ResumeWindow: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-container-lowest">
      {/* WordPad Toolbar */}
      <div className="bg-surface-container-low p-space-xs flex items-center justify-between shadow-inner border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <a
            className="px-space-sm py-1 bg-surface-container-lowest hover:bg-surface-container rounded shadow-sm text-primary font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
            href="https://linkedin.com/in/alinagshriz"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[14px]">download</span> Download PDF
          </a>
          <button
            className="px-space-sm py-1 bg-surface-container-lowest hover:bg-surface-container rounded shadow-sm text-on-surface font-label-sm text-label-sm flex items-center gap-1 cursor-pointer"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined text-[14px]">print</span> Print
          </button>
        </div>
        <span className="font-code-sm text-code-sm text-outline pr-2 font-mono">Page 1 of 2</span>
      </div>

      {/* Document Whiteboard */}
      <div className="flex-1 p-space-lg bg-surface-container-lowest overflow-y-auto font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-space-md select-text">
        <div className="border-b border-outline-variant/30 pb-space-sm">
          <span className="font-headline-lg text-headline-lg text-primary block font-bold">
            Ali N. Abadian
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface-variant block font-medium">
            Senior Frontend Developer • Frontend Platform Engineer
          </span>
          <span className="font-body-sm text-body-sm text-outline block mt-1">
            Tabriz, Iran | Remote Work Ready | linkedin.com/in/alinagshriz | github.com/AliNAbadian
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
            Professional Summary
          </span>
          <p className="text-on-surface leading-relaxed">
            Frontend Platform Engineer with over 6 years of focused experience delivering mission-critical enterprise web platforms. Specialist in architecting zero-runtime-overhead micro-frontend ecosystems, optimizing large-scale spatial dashboards with WebGL and MapLibre, and translating complex B2B workflow constraints into intuitive user journeys. Active explorer in Generative UI and MCP agent integrations.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
            Key Roles &amp; Achievements
          </span>
          <div className="bg-surface-container-low p-space-sm rounded border border-outline-variant/20">
            <div className="flex justify-between items-baseline flex-wrap gap-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Senior Frontend Engineer • Logistics &amp; Mobility Suite
              </span>
              <span className="font-code-sm text-code-sm text-outline font-mono">2022 – Present</span>
            </div>
            <ul className="list-disc list-inside font-body-sm text-body-sm text-on-surface-variant mt-2 space-y-1">
              <li>
                Engineered interactive logistics dispatch engine utilizing MapLibre GL, reducing polygon render latency by 64% via custom WebGL clustering.
              </li>
              <li>
                Architected company-wide micro-frontend host migration to Rspack + Module Federation, cutting CI build pipeline durations from 7.5 minutes to 84 seconds.
              </li>
              <li>
                Spearheaded Persian RTL localization framework for mission-critical enterprise targeting grids.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

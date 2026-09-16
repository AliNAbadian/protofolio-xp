import React from 'react';
import { projectsData } from '../../data/portfolioData';
import type { WindowId } from '../../types';

interface ProjectsWindowProps {
  onSelectProject: (projectId: string) => void;
  onOpenWindow: (id: WindowId) => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  onSelectProject,
  onOpenWindow,
}) => {
  const projectsList = Object.values(projectsData);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-container-lowest">
      {/* Explorer Menu Toolbar */}
      <div className="bg-surface-container flex items-center px-space-sm py-1 gap-space-md shadow-sm border-b border-outline-variant/30 text-[12px]">
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          File
        </span>
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          Edit
        </span>
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          View
        </span>
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          Favorites
        </span>
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          Tools
        </span>
        <span className="font-body-sm text-body-sm text-on-surface cursor-pointer hover:underline">
          Help
        </span>
      </div>

      {/* Explorer Address / Navigation Bar */}
      <div className="bg-surface-container-low px-space-sm py-1 flex items-center gap-space-sm shadow-inner border-b border-outline-variant/40">
        <div className="flex items-center gap-1">
          <button
            title="Back"
            className="w-6 h-6 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </button>
          <button
            title="Forward"
            className="w-6 h-6 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
          <button
            title="Up"
            className="w-6 h-6 rounded bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
          </button>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Address:</span>
        <div className="flex-1 bg-surface-container-lowest px-space-sm py-0.5 rounded shadow-inner flex items-center gap-space-xs border border-outline-variant/50">
          <span className="material-symbols-outlined text-tertiary text-[15px]">folder</span>
          <span className="font-code-sm text-code-sm text-on-surface truncate">
            C:\Ali\Portfolio\KeyProjects
          </span>
        </div>
        <button className="px-space-sm py-0.5 bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm shadow-sm flex items-center gap-1 cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span> Go
        </button>
      </div>

      {/* Explorer Split View */}
      <div className="flex-1 flex min-h-0 bg-surface-container-lowest overflow-hidden">
        {/* Left Folder Task Panel */}
        <div className="w-56 bg-surface-container-low p-space-sm flex flex-col gap-space-sm shadow-sm overflow-y-auto border-r border-outline-variant/30 shrink-0">
          {/* Folders Tasks Widget */}
          <div className="rounded bg-surface-container shadow-sm overflow-hidden border border-outline-variant/20">
            <div className="bg-gradient-to-r from-primary/30 to-primary-container/20 px-space-sm py-1 flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-bold">
                Engineering Tasks
              </span>
              <span className="material-symbols-outlined text-primary text-[16px]">expand_less</span>
            </div>
            <div className="p-space-xs flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <a
                className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container-high text-primary hover:underline"
                href="https://github.com/AliNAbadian"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span> GitHub Profile
              </a>
              <a
                className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container-high text-primary hover:underline"
                href="https://linkedin.com/in/alinagshriz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">badge</span> LinkedIn Connect
              </a>
              <button
                className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container-high text-on-surface text-left cursor-pointer"
                onClick={() => onOpenWindow('win-terminal')}
              >
                <span className="material-symbols-outlined text-[16px]">terminal</span> Run Dev Shell
              </button>
            </div>
          </div>

          {/* System Details Widget */}
          <div className="rounded bg-surface-container shadow-sm p-space-sm flex flex-col gap-1 border border-outline-variant/20">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
              Directory Stats
            </span>
            <span className="font-body-sm text-body-sm text-on-surface">5 Production Solutions</span>
            <span className="font-code-sm text-code-sm text-outline">State: Deployed &amp; Tested</span>
            <div className="mt-2 p-1.5 bg-surface-container-lowest rounded shadow-inner">
              <span className="font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> 100% Type-Safe
              </span>
            </div>
          </div>
        </div>

        {/* Right Item Grid / Detailed List */}
        <div className="flex-1 p-space-md overflow-y-auto flex flex-col gap-space-sm">
          {projectsList.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className="project-row group p-space-sm rounded bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm border border-outline-variant/20"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div
                  className={`w-10 h-10 rounded ${proj.colorClass} flex items-center justify-center shrink-0 shadow`}
                >
                  <span className="material-symbols-outlined text-[24px]">{proj.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                      {proj.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                      {proj.tag}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {proj.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm self-end md:self-auto shrink-0">
                <span className="font-code-sm text-code-sm px-2 py-1 rounded bg-surface-container-lowest shadow-inner text-on-surface-variant">
                  {proj.stack}
                </span>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explorer Status Bar */}
      <div className="bg-surface-container px-space-md py-1 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant shadow-inner border-t border-outline-variant/30">
        <span>5 objects (plus 1 open-source library)</span>
        <span>Total Stack Size: 0 unhandled runtime exceptions</span>
      </div>
    </div>
  );
};

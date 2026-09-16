import React from 'react';
import type { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      onClick={onClose}
      className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] rounded-t-lg shadow-2xl bg-surface-container-high flex flex-col overflow-hidden border border-outline-variant/50"
        style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)' }}
      >
        {/* Titlebar */}
        <div className="h-7 bg-gradient-to-r from-primary to-primary-container flex items-center justify-between px-space-sm select-none">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-surface-container-lowest text-[16px]">
              visibility
            </span>
            <span className="font-titlebar text-titlebar text-surface-container-lowest truncate">
              {project.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-4 bg-error text-surface-container-lowest font-body-sm rounded-sm flex items-center justify-center hover:bg-on-error-container shadow-inner cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-lg bg-surface-container-lowest flex flex-col gap-space-md max-h-[80vh] overflow-y-auto">
          {/* Badge */}
          <div>
            <span className="px-2 py-1 rounded bg-primary-fixed text-on-primary-fixed-variant font-code-sm text-code-sm font-bold inline-block">
              {project.badge}
            </span>
          </div>

          {/* Details */}
          <div className="font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-3">
            <div>
              <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                Architecture Challenge
              </h4>
              <p className="text-on-surface leading-relaxed">{project.architectureChallenge}</p>
            </div>

            <div>
              <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                Engineering Solution
              </h4>
              <p className="text-on-surface leading-relaxed">{project.engineeringSolution}</p>
            </div>

            {project.impact && (
              <div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Impact</h4>
                <p className="text-on-surface leading-relaxed">{project.impact}</p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-space-sm pt-space-xs border-t border-outline-variant/30">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-space-md py-1 bg-primary text-on-primary rounded font-label-md text-label-md shadow hover:bg-primary-container cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Visit Repository / Demo
            </a>
            <button
              onClick={onClose}
              className="px-space-md py-1 bg-surface-container text-on-surface rounded font-label-md text-label-md shadow hover:bg-surface-container-high cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

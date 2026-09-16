import React, { useEffect, useState } from 'react';
import { Desktop } from './components/Desktop/Desktop';
import { StartMenu } from './components/StartMenu/StartMenu';
import { Taskbar } from './components/Taskbar/Taskbar';
import { XpWindow } from './components/Window/XpWindow';
import { AboutWindow } from './components/Windows/AboutWindow';
import { AiLabWindow } from './components/Windows/AiLabWindow';
import { ContactWindow } from './components/Windows/ContactWindow';
import { ProjectDetailModal } from './components/Windows/ProjectDetailModal';
import { ProjectsWindow } from './components/Windows/ProjectsWindow';
import { RecycleBinWindow } from './components/Windows/RecycleBinWindow';
import { ResumeWindow } from './components/Windows/ResumeWindow';
import { SkillsWindow } from './components/Windows/SkillsWindow';
import { TerminalWindow } from './components/Windows/TerminalWindow';
import { WelcomeWindow } from './components/Windows/WelcomeWindow';
import { InternetExplorerWindow } from './components/Windows/InternetExplorerWindow';
import { initialWindows, projectsData } from './data/portfolioData';
import type { ProjectItem, WindowConfig, WindowId } from './types';

export const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<WindowId, WindowConfig>>(initialWindows);
  const [highestZ, setHighestZ] = useState(30);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('win-welcome');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Focus and bring window to front
  const focusWindow = (id: WindowId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  // Open a window (or bring to front if already open)
  const openWindow = (id: WindowId) => {
    const nextZ = highestZ + 1;
    setHighestZ(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  // Close window
  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  // Minimize window
  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  // Taskbar button click toggles minimize/restore or focus
  const handleTaskbarItemClick = (id: WindowId) => {
    const win = windows[id];
    if (!win) return;

    if (win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  // Update position
  const handlePositionChange = (id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        position,
      },
    }));
  };

  // Keyboard shortcut: Escape toggles Start Menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStartMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onClick={() => {
        if (isStartMenuOpen) setIsStartMenuOpen(false);
      }}
      className="relative w-screen h-screen overflow-hidden select-none"
    >
      <Desktop onOpenWindow={openWindow}>
        {/* Floating Windows */}

        {/* 1. Welcome Wizard */}
        <XpWindow
          config={windows['win-welcome']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-welcome')}
          onMinimize={() => minimizeWindow('win-welcome')}
          onFocus={() => focusWindow('win-welcome')}
          onPositionChange={(pos) => handlePositionChange('win-welcome', pos)}
        >
          <WelcomeWindow onOpenWindow={openWindow} />
        </XpWindow>

        {/* 2. Projects Explorer */}
        <XpWindow
          config={windows['win-projects']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-projects')}
          onMinimize={() => minimizeWindow('win-projects')}
          onFocus={() => focusWindow('win-projects')}
          onPositionChange={(pos) => handlePositionChange('win-projects', pos)}
        >
          <ProjectsWindow
            onSelectProject={(projId) => setSelectedProject(projectsData[projId] || null)}
            onOpenWindow={openWindow}
          />
        </XpWindow>

        {/* 3. AI Lab.exe */}
        <XpWindow
          config={windows['win-ailab']}
          titlebarGradient="from-[#003cac] via-primary-container to-[#1a7425]"
          onClose={() => closeWindow('win-ailab')}
          onMinimize={() => minimizeWindow('win-ailab')}
          onFocus={() => focusWindow('win-ailab')}
          onPositionChange={(pos) => handlePositionChange('win-ailab', pos)}
        >
          <AiLabWindow />
        </XpWindow>

        {/* 4. Retro Terminal (CMD.EXE) */}
        <XpWindow
          config={windows['win-terminal']}
          titlebarGradient="from-inverse-surface via-on-surface-variant to-inverse-surface"
          onClose={() => closeWindow('win-terminal')}
          onMinimize={() => minimizeWindow('win-terminal')}
          onFocus={() => focusWindow('win-terminal')}
          onPositionChange={(pos) => handlePositionChange('win-terminal', pos)}
        >
          <TerminalWindow onOpenWindow={openWindow} />
        </XpWindow>

        {/* 5. About Me (System Properties) */}
        <XpWindow
          config={windows['win-about']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-about')}
          onMinimize={() => minimizeWindow('win-about')}
          onFocus={() => focusWindow('win-about')}
          onPositionChange={(pos) => handlePositionChange('win-about', pos)}
        >
          <AboutWindow onClose={() => closeWindow('win-about')} onOpenWindow={openWindow} />
        </XpWindow>

        {/* 6. Skills (Device Manager) */}
        <XpWindow
          config={windows['win-skills']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-skills')}
          onMinimize={() => minimizeWindow('win-skills')}
          onFocus={() => focusWindow('win-skills')}
          onPositionChange={(pos) => handlePositionChange('win-skills', pos)}
        >
          <SkillsWindow />
        </XpWindow>

        {/* 7. Resume (WordPad) */}
        <XpWindow
          config={windows['win-resume']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-resume')}
          onMinimize={() => minimizeWindow('win-resume')}
          onFocus={() => focusWindow('win-resume')}
          onPositionChange={(pos) => handlePositionChange('win-resume', pos)}
        >
          <ResumeWindow />
        </XpWindow>

        {/* 8. Contact (Outlook Express) */}
        <XpWindow
          config={windows['win-contact']}
          titlebarGradient="from-secondary via-secondary-container to-secondary"
          onClose={() => closeWindow('win-contact')}
          onMinimize={() => minimizeWindow('win-contact')}
          onFocus={() => focusWindow('win-contact')}
          onPositionChange={(pos) => handlePositionChange('win-contact', pos)}
        >
          <ContactWindow />
        </XpWindow>

        {/* 9. Recycle Bin */}
        <XpWindow
          config={windows['win-recycle']}
          titlebarGradient="from-primary via-primary-container to-primary"
          onClose={() => closeWindow('win-recycle')}
          onMinimize={() => minimizeWindow('win-recycle')}
          onFocus={() => focusWindow('win-recycle')}
          onPositionChange={(pos) => handlePositionChange('win-recycle', pos)}
        >
          <RecycleBinWindow />
        </XpWindow>

        {/* 10. Internet Explorer */}
        <XpWindow
          config={windows['win-ie']}
          titlebarGradient="from-[#0055ea] via-[#2470d8] to-[#0040b5]"
          onClose={() => closeWindow('win-ie')}
          onMinimize={() => minimizeWindow('win-ie')}
          onFocus={() => focusWindow('win-ie')}
          onPositionChange={(pos) => handlePositionChange('win-ie', pos)}
        >
          <InternetExplorerWindow />
        </XpWindow>

        {/* Project Inspector Modal */}
        <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Desktop>

      {/* XP Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => setIsStartMenuOpen((prev) => !prev)}
        onTaskbarItemClick={handleTaskbarItemClick}
      />
    </div>
  );
};

export default App;

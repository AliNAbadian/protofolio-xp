export type WindowId =
  | 'win-welcome'
  | 'win-projects'
  | 'win-ailab'
  | 'win-terminal'
  | 'win-about'
  | 'win-skills'
  | 'win-resume'
  | 'win-contact'
  | 'win-recycle';

export interface WindowConfig {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  width?: string;
  maxWidth?: string;
  height?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  stack: string;
  icon: string;
  colorClass: string;
  title: string;
  badge: string;
  architectureChallenge: string;
  engineeringSolution: string;
  impact?: string;
  link: string;
}

export interface DesktopIconItem {
  id: WindowId;
  label: string;
  icon: string;
  bgClass: string;
  textColorClass: string;
}

export type AiScenarioType = 'route' | 'metrics' | 'schema';

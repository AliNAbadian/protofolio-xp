import type { OsTheme } from '../types';

export const getNextTheme = (current: OsTheme): OsTheme => {
  return current === 'xp' ? 'win7' : 'xp';
};

export const getStoredTheme = (): OsTheme => {
  if (typeof window === 'undefined') return 'xp';
  const saved = localStorage.getItem('xp_os_theme');
  return saved === 'win7' ? 'win7' : 'xp';
};

export const saveTheme = (theme: OsTheme): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('xp_os_theme', theme);
  }
};

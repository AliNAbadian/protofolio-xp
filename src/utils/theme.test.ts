import { describe, expect, it } from 'bun:test';
import { getNextTheme } from './theme';

describe('OS Theme Switcher', () => {
  it('toggles from xp to win7', () => {
    expect(getNextTheme('xp')).toBe('win7');
  });

  it('toggles from win7 to xp', () => {
    expect(getNextTheme('win7')).toBe('xp');
  });
});

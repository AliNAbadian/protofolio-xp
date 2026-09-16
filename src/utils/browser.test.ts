import { describe, expect, it } from 'bun:test';
import { normalizeBrowserUrl, DEFAULT_HOME_URL } from './browser';

describe('Internet Explorer URL normalizer', () => {
  it('returns default home url when input is empty or whitespace', () => {
    expect(normalizeBrowserUrl('')).toBe(DEFAULT_HOME_URL);
    expect(normalizeBrowserUrl('   ')).toBe(DEFAULT_HOME_URL);
  });

  it('preserves existing https:// and http:// protocols', () => {
    expect(normalizeBrowserUrl('https://example.com')).toBe('https://example.com');
    expect(normalizeBrowserUrl('http://example.org/page')).toBe('http://example.org/page');
  });

  it('prefixes https:// for valid domain names', () => {
    expect(normalizeBrowserUrl('wikipedia.org')).toBe('https://wikipedia.org');
    expect(normalizeBrowserUrl('github.com/facebook/react')).toBe('https://github.com/facebook/react');
  });

  it('maps duckduckgo domain to frame-ancestor compliant html endpoint', () => {
    expect(normalizeBrowserUrl('duckduckgo.com')).toBe('https://html.duckduckgo.com/html/');
    expect(normalizeBrowserUrl('https://duckduckgo.com')).toBe('https://html.duckduckgo.com/html/');
    expect(normalizeBrowserUrl('https://duckduckgo.com/')).toBe('https://html.duckduckgo.com/html/');
  });

  it('turns non-domain search phrases into frame-compatible DuckDuckGo search queries', () => {
    expect(normalizeBrowserUrl('windows xp nostalgia')).toBe(
      'https://html.duckduckgo.com/html/?q=windows+xp+nostalgia'
    );
  });
});

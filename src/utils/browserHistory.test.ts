import { describe, expect, it } from 'bun:test';
import { createBrowserHistory } from './browser';

describe('Browser History', () => {
  it('initializes with start url and correct state', () => {
    const h = createBrowserHistory('https://site1.com');
    expect(h.current).toBe('https://site1.com');
    expect(h.canGoBack).toBe(false);
    expect(h.canGoForward).toBe(false);
  });

  it('navigates to new url and enables back', () => {
    let h = createBrowserHistory('https://site1.com');
    h = h.navigate('https://site2.com');
    expect(h.current).toBe('https://site2.com');
    expect(h.canGoBack).toBe(true);
    expect(h.canGoForward).toBe(false);
  });

  it('navigates back and forward correctly', () => {
    let h = createBrowserHistory('https://site1.com');
    h = h.navigate('https://site2.com');
    h = h.back();
    expect(h.current).toBe('https://site1.com');
    expect(h.canGoBack).toBe(false);
    expect(h.canGoForward).toBe(true);

    h = h.forward();
    expect(h.current).toBe('https://site2.com');
  });

  it('truncates forward history on new navigation after going back', () => {
    let h = createBrowserHistory('https://site1.com');
    h = h.navigate('https://site2.com');
    h = h.back();
    h = h.navigate('https://site3.com');
    expect(h.current).toBe('https://site3.com');
    expect(h.canGoForward).toBe(false);
  });
});

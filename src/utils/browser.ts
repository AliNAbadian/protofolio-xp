export const DEFAULT_HOME_URL = 'https://en.wikipedia.org/wiki/Windows_XP';

export const normalizeBrowserUrl = (input: string): string => {
  const trimmed = input.trim();
  if (!trimmed) return DEFAULT_HOME_URL;

  // DuckDuckGo frame-ancestors directive requires html.duckduckgo.com
  if (/^https?:\/\/(www\.)?duckduckgo\.com(\/)?$/i.test(trimmed) || /^duckduckgo\.com(\/)?$/i.test(trimmed)) {
    return 'https://html.duckduckgo.com/html/';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // Domain pattern: e.g. domain.tld or domain.tld/path
  if (/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  // Fallback to frame-compatible DuckDuckGo search query
  const query = trimmed.replace(/\s+/g, '+');
  return `https://html.duckduckgo.com/html/?q=${query}`;
};

export interface BrowserHistoryState {
  current: string;
  canGoBack: boolean;
  canGoForward: boolean;
  navigate: (url: string) => BrowserHistoryState;
  back: () => BrowserHistoryState;
  forward: () => BrowserHistoryState;
}

export const createBrowserHistory = (
  initialUrl: string = DEFAULT_HOME_URL,
  stack: string[] = [initialUrl],
  index: number = 0
): BrowserHistoryState => {
  return {
    current: stack[index],
    canGoBack: index > 0,
    canGoForward: index < stack.length - 1,
    navigate: (url: string) => {
      const newStack = [...stack.slice(0, index + 1), url];
      return createBrowserHistory(url, newStack, newStack.length - 1);
    },
    back: () => {
      if (index > 0) {
        return createBrowserHistory(stack[index - 1], stack, index - 1);
      }
      return createBrowserHistory(stack[index], stack, index);
    },
    forward: () => {
      if (index < stack.length - 1) {
        return createBrowserHistory(stack[index + 1], stack, index + 1);
      }
      return createBrowserHistory(stack[index], stack, index);
    },
  };
};

import React, { useState } from 'react';
import { createBrowserHistory, DEFAULT_HOME_URL, normalizeBrowserUrl } from '../../utils/browser';

const QUICK_BOOKMARKS = [
  { name: 'Wikipedia: Windows XP', url: 'https://en.wikipedia.org/wiki/Windows_XP' },
  { name: 'DuckDuckGo Search', url: 'https://html.duckduckgo.com/html/' },
  { name: 'Internet Archive', url: 'https://archive.org' },
  { name: 'W3Schools', url: 'https://www.w3schools.com' },
];

export const InternetExplorerWindow: React.FC = () => {
  const [history, setHistory] = useState(() => createBrowserHistory(DEFAULT_HOME_URL));
  const [inputUrl, setInputUrl] = useState(DEFAULT_HOME_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const navigateTo = (rawUrl: string) => {
    const target = normalizeBrowserUrl(rawUrl);
    setInputUrl(target);
    setIsLoading(true);
    setHistory((prev) => prev.navigate(target));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(inputUrl);
  };

  const handleBack = () => {
    if (!history.canGoBack) return;
    const next = history.back();
    setHistory(next);
    setInputUrl(next.current);
    setIsLoading(true);
  };

  const handleForward = () => {
    if (!history.canGoForward) return;
    const next = history.forward();
    setHistory(next);
    setInputUrl(next.current);
    setIsLoading(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  };

  const handleHome = () => {
    navigateTo(DEFAULT_HOME_URL);
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#ece9d8] select-none text-xs font-sans text-black">
      {/* Menu Bar */}
      <div className="flex items-center gap-3 px-2 py-0.5 bg-[#ece9d8] border-b border-[#d4d0c8] text-[#222]">
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">File</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Edit</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">View</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Favorites</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Tools</span>
        <span className="hover:bg-[#316ac5] hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer">Help</span>
        <div className="ml-auto flex items-center pr-1">
          {/* XP Spinning Globe Logo */}
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-tr from-[#0055ea] to-[#80c8ff] flex items-center justify-center border border-[#003cac] shadow-inner ${
              isLoading ? 'animate-spin' : ''
            }`}
            title="Windows Internet Explorer"
          >
            <span className="material-symbols-outlined text-[16px] text-white">public</span>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f8f7f2] to-[#ece9d8] border-b border-[#d4d0c8]">
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={!history.canGoBack}
          className={`flex items-center gap-1 px-2 py-1 rounded border ${
            history.canGoBack
              ? 'border-transparent hover:border-[#b5c4ff] hover:bg-[#dbe1ff]/60 active:bg-[#b5c4ff] cursor-pointer text-[#111]'
              : 'border-transparent opacity-40 cursor-not-allowed text-[#777]'
          }`}
          title="Back (Alt+Left Arrow)"
        >
          <div className="w-5 h-5 rounded-full bg-[#3ba239] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          </div>
          <span className="font-bold text-[11px]">Back</span>
        </button>

        {/* Forward Button */}
        <button
          onClick={handleForward}
          disabled={!history.canGoForward}
          className={`flex items-center justify-center p-1 rounded border ${
            history.canGoForward
              ? 'border-transparent hover:border-[#b5c4ff] hover:bg-[#dbe1ff]/60 active:bg-[#b5c4ff] cursor-pointer text-[#111]'
              : 'border-transparent opacity-40 cursor-not-allowed text-[#777]'
          }`}
          title="Forward (Alt+Right Arrow)"
        >
          <div className="w-5 h-5 rounded-full bg-[#3ba239] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </div>
        </button>

        <div className="h-4 w-[1px] bg-[#bbb] mx-1"></div>

        {/* Stop Button */}
        <button
          onClick={handleStop}
          className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#dbe1ff]/60 cursor-pointer"
          title="Stop"
        >
          <span className="material-symbols-outlined text-[16px] text-[#c00]">close</span>
          <span className="text-[9px] leading-tight">Stop</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#dbe1ff]/60 cursor-pointer"
          title="Refresh (F5)"
        >
          <span className="material-symbols-outlined text-[16px] text-[#2b7528]">refresh</span>
          <span className="text-[9px] leading-tight">Refresh</span>
        </button>

        {/* Home Button */}
        <button
          onClick={handleHome}
          className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#dbe1ff]/60 cursor-pointer"
          title="Home"
        >
          <span className="material-symbols-outlined text-[16px] text-[#9c6500]">home</span>
          <span className="text-[9px] leading-tight">Home</span>
        </button>

        <div className="h-4 w-[1px] bg-[#bbb] mx-1"></div>

        {/* Search */}
        <button
          onClick={() => navigateTo('https://html.duckduckgo.com/html/')}
          className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#dbe1ff]/60 cursor-pointer"
          title="Search the Web"
        >
          <span className="material-symbols-outlined text-[16px] text-[#0055ea]">search</span>
          <span className="text-[9px] leading-tight">Search</span>
        </button>

        {/* Favorites */}
        <button
          onClick={() => navigateTo('https://archive.org')}
          className="flex flex-col items-center px-1.5 py-0.5 rounded hover:bg-[#dbe1ff]/60 cursor-pointer"
          title="Favorites"
        >
          <span className="material-symbols-outlined text-[16px] text-[#c98e00]">star</span>
          <span className="text-[9px] leading-tight">Favorites</span>
        </button>

        {/* Open in new tab link */}
        <a
          href={history.current}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 px-2 py-1 bg-white border border-[#999] rounded text-[11px] text-[#0040b5] hover:bg-[#f0f4ff] font-medium shadow-2xs"
          title="Open currently displayed website in a new browser tab"
        >
          <span>Open External</span>
          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
        </a>
      </div>

      {/* Address Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-2 px-2 py-1 bg-[#ece9d8] border-b border-[#d4d0c8]"
      >
        <span className="text-[11px] text-[#444] font-medium shrink-0">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7f9db9] rounded-xs px-1.5 py-0.5 shadow-inner">
          <span className="material-symbols-outlined text-[16px] text-[#0055ea] mr-1">public</span>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-transparent outline-none text-[12px] text-black font-mono selection:bg-[#316ac5] selection:text-white"
            placeholder="Type web address or search query..."
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-b from-[#eef9ee] to-[#d6edd6] border border-[#3ba239] rounded-xs shadow-2xs hover:brightness-105 active:brightness-95 cursor-pointer text-[#1e6b1d] font-bold text-[11px]"
        >
          <span className="material-symbols-outlined text-[14px]">play_arrow</span>
          <span>Go</span>
        </button>
      </form>

      {/* Quick Links Bar */}
      <div className="flex items-center gap-2 px-2 py-0.5 bg-[#f5f4ef] border-b border-[#d4d0c8] text-[10px] text-[#555] overflow-x-auto">
        <span className="font-bold text-[#333] shrink-0">Links:</span>
        {QUICK_BOOKMARKS.map((b) => (
          <button
            key={b.name}
            onClick={() => navigateTo(b.url)}
            className="px-1.5 py-0.5 rounded-xs hover:bg-[#dbe1ff] hover:text-[#0040b5] cursor-pointer whitespace-nowrap"
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Real Browser Iframe Body */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#dbe1ff] z-10 overflow-hidden">
            <div className="h-full bg-[#0055ea] animate-pulse w-2/3"></div>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={history.current}
          title="Internet Explorer Browser"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#ece9d8] border-t border-[#d4d0c8] px-2 flex items-center justify-between text-[11px] text-[#444]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#2b7528]">
            {isLoading ? 'hourglass_top' : 'check_circle'}
          </span>
          <span>{isLoading ? 'Opening page...' : 'Done'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border-l border-[#ccc] pl-2">
            <span className="material-symbols-outlined text-[14px] text-[#0055ea]">verified_user</span>
            <span>Internet</span>
          </div>
          <span className="text-[10px] text-[#666]">100%</span>
        </div>
      </div>
    </div>
  );
};

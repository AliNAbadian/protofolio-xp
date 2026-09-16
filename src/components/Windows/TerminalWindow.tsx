import React, { useEffect, useRef, useState } from 'react';
import type { WindowId } from '../../types';

interface TerminalWindowProps {
  onOpenWindow: (id: WindowId) => void;
}

interface HistoryEntry {
  command: string;
  outputHtml: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ onOpenWindow }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const raw = inputValue;
      const clean = raw.toLowerCase().trim();
      setInputValue('');

      let outHtml = '';
      switch (clean) {
        case 'help':
          outHtml = `
            Commands available:<br/>
            &bull; <span class="text-surface-container-lowest font-bold">about</span>     : Show platform background<br/>
            &bull; <span class="text-surface-container-lowest font-bold">skills</span>    : Display core technology proficiencies<br/>
            &bull; <span class="text-surface-container-lowest font-bold">projects</span>  : Inspect production work<br/>
            &bull; <span class="text-surface-container-lowest font-bold">contact</span>   : View direct contact channels<br/>
            &bull; <span class="text-surface-container-lowest font-bold">github</span>    : Open GitHub repository<br/>
            &bull; <span class="text-surface-container-lowest font-bold">clear</span>     : Wipe console buffer<br/>
            &bull; <span class="text-surface-container-lowest font-bold">sudo hire-ali</span> : Executive recruiter shortcut
          `;
          break;
        case 'about':
          outHtml =
            'Ali N. Abadian — Senior Frontend Platform Engineer with 6+ years experience in B2B SaaS, Micro-Frontends, MapLibre GL, and AI-native Generative UI architectures.';
          break;
        case 'skills':
          outHtml =
            'React 19, TypeScript, Next.js, Module Federation, Rspack, Zustand, TanStack Query, MapLibre GL, WebGL, MCP, Tailwind CSS.';
          break;
        case 'projects':
          outHtml =
            '1) Route Manager (MapLibre/WebGL)<br/>2) Customer Panel (B2B SaaS)<br/>3) Targeting Engine (Persian RTL)<br/>4) ERP MFE Platform (Rspack)<br/>5) Polyfed (Open Source)';
          break;
        case 'contact':
          outHtml =
            'Email: ali.abadian@frontend-engineer.dev | LinkedIn: linkedin.com/in/alinagshriz | GitHub: github.com/AliNAbadian';
          break;
        case 'github':
          window.open('https://github.com/AliNAbadian', '_blank');
          outHtml = 'Opening https://github.com/AliNAbadian in browser...';
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'sudo hire-ali':
          outHtml =
            "<span class='text-secondary font-bold'>PERMISSION GRANTED!</span> Ali is actively evaluating high-impact Frontend Platform and Senior UI Engineering roles. Launching Contact dialog...";
          onOpenWindow('win-contact');
          break;
        case 'npm install motivation':
          outHtml =
            "added 1 package, and audited 42 packages in 32ms.<br/><span class='text-secondary font-bold'>Found 0 vulnerabilities. Motivation 100% restored.</span>";
          break;
        case 'matrix':
          outHtml = 'Wake up, Neo... The Matrix has you. Follow the white rabbit.';
          break;
        case '':
          outHtml = '';
          break;
        default:
          outHtml = `'${raw}' is not recognized as an internal or external command. Type 'help' for instructions.`;
          break;
      }

      setHistory((prev) => [...prev, { command: raw, outputHtml: outHtml }]);
    }
  };

  return (
    <div
      ref={screenRef}
      onClick={() => inputRef.current?.focus()}
      className="flex-1 p-space-md bg-[#000000] text-secondary-container font-code-md text-code-md overflow-y-auto flex flex-col gap-1 select-text font-mono min-h-0"
    >
      <div>Microsoft Windows XP [Version 5.1.2600]</div>
      <div>(C) Copyright 1985-2001 Microsoft Corp. Ali N. Abadian Shell v2.4</div>
      <div className="text-surface-container-lowest mt-1">
        Type <span className="text-secondary-fixed-dim font-bold">help</span> to view available
        platform commands. Try <span className="text-tertiary-fixed font-bold">sudo hire-ali</span>{' '}
        or <span className="text-secondary-fixed-dim font-bold">projects</span>.
      </div>
      <div className="h-2"></div>

      {/* History */}
      <div className="flex flex-col gap-1">
        {history.map((entry, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            <div>
              <span className="text-surface-container-lowest font-bold">C:\Users\Ali&gt;</span>{' '}
              {entry.command}
            </div>
            {entry.outputHtml && (
              <div
                className="text-secondary-fixed-dim leading-relaxed"
                dangerouslySetInnerHTML={{ __html: entry.outputHtml }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-surface-container-lowest font-bold shrink-0">C:\Users\Ali&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-secondary-container font-code-md text-code-md focus:outline-none border-none p-0 caret-[#9df898]"
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';

export const ContactWindow: React.FC = () => {
  const [subject, setSubject] = useState('Senior Frontend Platform Role / Collaboration');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert('Thank you for reaching out! Ali has been notified via digital mail routing.');
    setMessage('');
  };

  return (
    <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-sm">
      <div className="flex items-center gap-space-sm font-body-sm text-body-sm">
        <span className="w-16 text-outline font-bold">To:</span>
        <div className="flex-1 px-space-sm py-1 bg-surface-container-low rounded font-code-sm text-code-sm text-on-surface border border-outline-variant/30 font-mono">
          Ali N. Abadian &lt;ali.abadian@frontend-engineer.dev&gt;
        </div>
      </div>

      <div className="flex items-center gap-space-sm font-body-sm text-body-sm">
        <span className="w-16 text-outline font-bold">Subject:</span>
        <input
          className="flex-1 px-space-sm py-1 bg-surface-container-lowest border border-outline-variant/50 rounded shadow-inner font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="w-16 text-outline font-bold font-body-sm text-body-sm">Message:</span>
        <textarea
          className="w-full p-space-sm bg-surface-container-lowest border border-outline-variant/50 rounded shadow-inner font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary resize-y"
          placeholder="Hi Ali, we reviewed your architecture projects and would love to connect..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between pt-space-xs flex-wrap gap-2">
        <div className="flex items-center gap-space-sm">
          <a
            className="px-space-md py-1 bg-primary text-on-primary rounded font-label-md text-label-md shadow flex items-center gap-1 cursor-pointer hover:bg-primary-container"
            href="https://linkedin.com/in/alinagshriz"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[16px]">badge</span> Open LinkedIn
          </a>
          <a
            className="px-space-md py-1 bg-inverse-surface text-on-primary rounded font-label-md text-label-md shadow flex items-center gap-1 cursor-pointer hover:opacity-90"
            href="https://github.com/AliNAbadian"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[16px]">code</span> View GitHub
          </a>
        </div>
        <button
          className="px-space-md py-1 bg-secondary text-on-secondary rounded font-label-md text-label-md shadow hover:bg-on-secondary-container cursor-pointer"
          onClick={handleSend}
        >
          Send Mail
        </button>
      </div>
    </div>
  );
};

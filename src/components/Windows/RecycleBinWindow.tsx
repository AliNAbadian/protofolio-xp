import React from 'react';

export const RecycleBinWindow: React.FC = () => {
  return (
    <div className="p-space-lg bg-surface-container-lowest flex flex-col items-center text-center gap-space-sm">
      <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-outline shadow-inner">
        <span className="material-symbols-outlined text-[32px]">delete_sweep</span>
      </div>
      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
        Recycle Bin is Empty
      </span>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] leading-relaxed">
        No technical debt, jQuery dependencies, or unhandled promise rejections found on this workstation.
      </p>
      <button
        onClick={() => alert('Recycle Bin already pristine!')}
        className="mt-2 px-space-md py-1 bg-surface-container hover:bg-surface-container-high rounded font-label-md text-label-md shadow text-on-surface cursor-pointer"
      >
        Empty Recycle Bin
      </button>
    </div>
  );
};

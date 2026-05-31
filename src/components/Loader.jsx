import React from 'react';

const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="relative flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500 shadow-lg shadow-emerald-500/10"></div>
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase animate-pulse">Loading Antigravity...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[30vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500 shadow-lg shadow-emerald-500/10"></div>
    </div>
  );
};

export default Loader;

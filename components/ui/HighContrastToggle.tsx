'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function HighContrastToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ussh-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('ussh-theme', next ? 'dark' : 'light');
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-1.5 w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
        isDarkMode
          ? 'bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 shadow-sm'
          : 'bg-white/90 text-slate-700 border border-slate-300/80 hover:bg-white hover:text-ussh-navy shadow-2xs'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ussh-navy`}
      aria-label={isDarkMode ? 'Chuyển sang chế độ Ban ngày' : 'Chuyển sang chế độ Ban đêm'}
      title={isDarkMode ? 'Chuyển sang chế độ Ban ngày (Sáng)' : 'Chuyển sang chế độ Ban đêm (Tối)'}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Ngày</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-slate-600 shrink-0" />
          <span className="hidden sm:inline">Đêm</span>
        </>
      )}
    </button>
  );
}

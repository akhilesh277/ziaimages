
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePWA } from '../context/PWAContext';
import { MoonIcon, SunIcon, HeartIcon, DownloadIcon, MenuIcon } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { isInstallable, installApp } = usePWA();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 transition-all duration-300 bg-primary/90 backdrop-blur-md border-b border-border-base">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
             {/* Separate Hamburger Menu Icon */}
             <button 
                onClick={onMenuClick} 
                className="p-2 -ml-2 text-text-main hover:bg-secondary rounded-full transition-colors focus:outline-none"
                aria-label="Open Menu"
             >
                <MenuIcon className="w-7 h-7" />
             </button>

             {/* Logo Branding (Non-interactive) */}
             <div className="flex items-center gap-3 select-none pointer-events-none">
                 <img 
                    src="https://i.postimg.cc/qRB2Gnw2/Gemini-Generated-Image-vfkohrvfkohrvfko-1.png" 
                    alt="ZIA Logo" 
                    className="w-10 h-10 object-contain rounded-full shadow-sm"
                 />
                 <div className="flex flex-col">
                    <h1 className="text-2xl font-black tracking-tighter text-text-main leading-none">
                    ZIA.AI
                    </h1>
                    <span className="text-[10px] font-bold tracking-widest text-text-sub uppercase">
                        Visual Intelligence
                    </span>
                 </div>
             </div>
        </div>
        
        <div className="flex items-center gap-2">
            {isInstallable && (
                <button
                    onClick={installApp}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-full text-xs font-bold uppercase tracking-wide hover:scale-105 transition-transform"
                >
                    <DownloadIcon className="w-4 h-4" />
                    Install
                </button>
            )}

            <button
            onClick={toggleTheme}
            className="p-3 rounded-full transition-colors bg-secondary hover:bg-border-base text-text-main"
            aria-label="Toggle theme"
            title={`Current: ${theme.toUpperCase()}`}
            >
            {theme === 'light' && <MoonIcon className="w-5 h-5" />}
            {theme === 'dark' && <HeartIcon className="w-5 h-5" />}
            {theme === 'pink' && <SunIcon className="w-5 h-5" />}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

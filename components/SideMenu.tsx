
import React, { useState } from 'react';
import { CloseIcon, ShieldIcon, UserGroupIcon, InfoIcon, MenuIcon } from './Icons';
import { CreditsScreen, DisclaimerScreen, ResponsibilityScreen } from './InfoModals';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const [activeModal, setActiveModal] = useState<'credits' | 'disclaimer' | 'responsibility' | null>(null);

  const handleOpenModal = (modal: 'credits' | 'disclaimer' | 'responsibility') => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-primary border-r border-border-base z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border-base">
            <span className="font-black text-xl tracking-tighter uppercase text-text-main">Menu</span>
            <button onClick={onClose} className="p-2 -mr-2 text-text-main hover:bg-secondary rounded-full transition">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            
            <button 
                onClick={() => handleOpenModal('credits')}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary transition-colors text-left group"
            >
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary border border-border-base flex items-center justify-center transition-colors">
                    <UserGroupIcon className="w-5 h-5 text-text-sub group-hover:text-text-main" />
                </div>
                <div>
                    <span className="block font-bold text-text-main">Credits</span>
                    <span className="text-xs text-text-sub">Identity & Creation</span>
                </div>
            </button>

            <button 
                onClick={() => handleOpenModal('disclaimer')}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left group"
            >
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary border border-border-base flex items-center justify-center transition-colors">
                    <ShieldIcon className="w-5 h-5 text-text-sub group-hover:text-red-500" />
                </div>
                <div>
                    <span className="block font-bold text-text-main group-hover:text-red-500 transition-colors">Disclaimer</span>
                    <span className="text-xs text-text-sub">Important Information</span>
                </div>
            </button>

            <button 
                onClick={() => handleOpenModal('responsibility')}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors text-left group"
            >
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary border border-border-base flex items-center justify-center transition-colors">
                    <InfoIcon className="w-5 h-5 text-text-sub group-hover:text-blue-500" />
                </div>
                <div>
                    <span className="block font-bold text-text-main group-hover:text-blue-500 transition-colors">Use Responsibly</span>
                    <span className="text-xs text-text-sub">Guidelines & Ethics</span>
                </div>
            </button>

        </div>

        {/* Version Footer */}
        <div className="p-6 border-t border-border-base">
            <div className="flex items-center gap-3 opacity-50">
                <img 
                    src="https://i.postimg.cc/qRB2Gnw2/Gemini-Generated-Image-vfkohrvfkohrvfko-1.png" 
                    alt="ZIA Logo" 
                    className="w-8 h-8 object-contain rounded-full grayscale"
                />
                <div className="flex flex-col">
                    <span className="text-xs font-black text-text-main tracking-widest uppercase">ZIA.AI</span>
                    <span className="text-[10px] font-mono text-text-sub">v1.2.0 STABLE</span>
                </div>
            </div>
        </div>
      </div>

      {/* Render Active Modal */}
      {activeModal === 'credits' && <CreditsScreen onClose={handleCloseModal} />}
      {activeModal === 'disclaimer' && <DisclaimerScreen onClose={handleCloseModal} />}
      {activeModal === 'responsibility' && <ResponsibilityScreen onClose={handleCloseModal} />}
    </>
  );
};

export default SideMenu;

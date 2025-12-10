import React, { ReactNode } from 'react';
import { IconClose } from './Icons';

interface DesktopWindowProps {
  children: ReactNode;
  title: string;
  className?: string;
  onClose?: () => void;
}

export const DesktopWindow: React.FC<DesktopWindowProps> = ({ children, title, className = '', onClose }) => {
  return (
    <div className={`bg-[#DADAD3] border-2 border-[#1D1D1B] retro-shadow flex flex-col ${className}`}>
      {/* Window Title Bar */}
      <div className="h-9 border-b-2 border-[#1D1D1B] flex items-center justify-between px-2 bg-[#DADAD3] select-none cursor-move">
        <div className="w-full flex items-center h-full">
            {/* Window Controls - Updated to match inspiration (Square Close Button) */}
            <div className="flex items-center space-x-1.5 mr-4 border-r-2 border-[#1D1D1B] pr-3 h-full">
                <button 
                    onClick={onClose}
                    className="w-5 h-5 border-2 border-[#1D1D1B] bg-white hover:bg-[#EB3E49] hover:text-white cursor-pointer transition-colors flex items-center justify-center group"
                >
                    <IconClose size={12} strokeWidth={4} className="group-hover:text-white text-[#1D1D1B]" />
                </button>
            </div>
            {/* Title - Stripes decoration */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden h-full">
                <div className="absolute inset-0 flex flex-col justify-center space-y-[3px] opacity-10 pointer-events-none">
                    <div className="h-[2px] w-full bg-[#1D1D1B]"></div>
                    <div className="h-[2px] w-full bg-[#1D1D1B]"></div>
                    <div className="h-[2px] w-full bg-[#1D1D1B]"></div>
                    <div className="h-[2px] w-full bg-[#1D1D1B]"></div>
                </div>
                <span className="relative bg-[#DADAD3] px-4 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    {title}
                </span>
            </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4 md:p-6 overflow-auto custom-scrollbar flex-1 relative bg-[#F1F1EF]">
        {children}
      </div>
    </div>
  );
};
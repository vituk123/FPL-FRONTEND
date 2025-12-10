import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick, isActive }) => {
  return (
    <div 
        onClick={onClick}
        className={`flex flex-col items-center space-y-2 cursor-pointer group p-2 rounded-none border-2 border-transparent hover:border-[#1D1D1B] hover:bg-[#FEE242]/20 transition-all ${isActive ? 'bg-[#C1C1BF]/50' : ''}`}
    >
        <div className="bg-white border-2 border-[#1D1D1B] p-3 shadow-[4px_4px_0_rgba(29,30,28,0.2)] group-hover:shadow-[6px_6px_0_rgba(29,30,28,0.3)] group-hover:-translate-y-1 transition-all text-[#1D1D1B]">
            {icon}
        </div>
        <span className="font-mono text-xs font-bold bg-[#DADAD3] px-1 border border-transparent group-hover:border-[#1D1D1B] select-none text-center max-w-[100px] leading-tight">
            {label}
        </span>
    </div>
  );
};
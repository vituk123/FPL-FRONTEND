import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconWifi, IconBattery } from './Icons';
import { Magnet } from './animations/Magnet';

export const MacMenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-[#DADAD3] border-b-2 border-[#1D1D1B] z-50 flex items-center px-2 justify-between select-none shadow-sm">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-2 font-bold hover:text-[#50C1EC] transition-colors pl-2">
          {/* 
            NOTE: Place your 'logo.png' file in the 'public' folder of your project.
            If the image is not found, the alt text will display.
          */}
          <img 
            src="/logo.png" 
            alt="FPL Optimizer" 
            className="w-8 h-8 object-contain" 
          />
          <span className="font-mono tracking-tighter">FPL OPTIMIZER</span>
        </Link>
        <div className="hidden md:flex space-x-1 text-sm font-bold">
            <Magnet padding={0} magnetStrength={3} wrapperClassName="inline-block" innerClassName="inline-block">
                <span className="hover:bg-[#1D1D1B] hover:text-[#DADAD3] px-3 py-1 cursor-pointer transition-colors rounded-none block">File</span>
            </Magnet>
            <Magnet padding={0} magnetStrength={3} wrapperClassName="inline-block" innerClassName="inline-block">
                <span className="hover:bg-[#1D1D1B] hover:text-[#DADAD3] px-3 py-1 cursor-pointer transition-colors rounded-none block">Edit</span>
            </Magnet>
            <Magnet padding={0} magnetStrength={3} wrapperClassName="inline-block" innerClassName="inline-block">
                <span className="hover:bg-[#1D1D1B] hover:text-[#DADAD3] px-3 py-1 cursor-pointer transition-colors rounded-none block">View</span>
            </Magnet>
            <Magnet padding={0} magnetStrength={3} wrapperClassName="inline-block" innerClassName="inline-block">
                <span className="hover:bg-[#1D1D1B] hover:text-[#DADAD3] px-3 py-1 cursor-pointer transition-colors rounded-none block">Window</span>
            </Magnet>
            <Magnet padding={0} magnetStrength={3} wrapperClassName="inline-block" innerClassName="inline-block">
                <span className="hover:bg-[#1D1D1B] hover:text-[#DADAD3] px-3 py-1 cursor-pointer transition-colors rounded-none block">Help</span>
            </Magnet>
        </div>
      </div>
      <div className="flex items-center space-x-4 pr-2">
        <div className="flex items-center space-x-3 text-[#1D1D1B]">
            <IconWifi size={18} strokeWidth={3} />
            <IconBattery size={18} strokeWidth={3} />
        </div>
        <div className="text-sm font-mono font-bold border-l-2 border-[#1D1D1B] pl-4">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
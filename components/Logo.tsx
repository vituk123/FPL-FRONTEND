import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Gear Shape */}
    <path 
      d="M100 10 L110 15 L115 5 L125 10 L125 20 L135 15 L135 25 L145 25 L145 35 L155 35 L155 45 L165 50 L160 60 L170 65 L165 75 L175 80 L170 90 L180 100 L170 110 L175 120 L165 125 L170 135 L160 140 L165 150 L155 155 L155 165 L145 165 L145 175 L135 175 L135 185 L125 180 L125 190 L115 195 L110 185 L100 190 L90 185 L85 195 L75 190 L75 180 L65 185 L65 175 L55 175 L55 165 L45 165 L45 155 L35 150 L40 140 L30 135 L35 125 L25 120 L30 110 L20 100 L30 90 L25 80 L35 75 L30 65 L40 60 L35 50 L45 45 L45 35 L55 35 L55 25 L65 25 L65 15 L75 20 L75 10 L85 5 L90 15 L100 10Z" 
      fill="#FEE242" 
      stroke="#1D1D1B" 
      strokeWidth="3" 
    />
    
    {/* Inner Badge Background */}
    <circle cx="100" cy="100" r="80" fill="#2A2A5A" stroke="#1D1D1B" strokeWidth="3" />
    <circle cx="100" cy="100" r="75" fill="url(#grad1)" />
    
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#2A2A5A', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4B3F72', stopOpacity: 1 }} />
      </linearGradient>
      <path id="curve" d="M 35 100 A 65 65 0 0 1 165 100" />
    </defs>

    {/* Grid Lines */}
    <path d="M50 100 H150 M100 50 V150 M75 50 V150 M125 50 V150 M50 75 H150 M50 125 H150" stroke="#EB3E49" strokeWidth="1" opacity="0.4" />

    {/* Text */}
    <text width="200" fontSize="18" fontFamily="'Space Mono', monospace" fontWeight="bold" letterSpacing="2">
      <textPath href="#curve" startOffset="50%" textAnchor="middle" fill="#FEE242" stroke="#1D1D1B" strokeWidth="0.5">
        FPL OPTIMIZER
      </textPath>
    </text>

    {/* Shield */}
    <path d="M65 70 C 65 70, 100 55, 135 70 V 100 C 135 130, 100 155, 100 155 C 100 155, 65 130, 65 100 Z" fill="#2A2A5A" stroke="#FEE242" strokeWidth="2" />

    {/* Wings */}
    <path d="M65 95 Q 50 85 45 100 Q 60 110 70 100" fill="#DADAD3" stroke="#1D1D1B" strokeWidth="1.5" />
    <path d="M135 95 Q 150 85 155 100 Q 140 110 130 100" fill="#DADAD3" stroke="#1D1D1B" strokeWidth="1.5" />

    {/* Soccer Ball */}
    <circle cx="100" cy="100" r="20" fill="#FFFFFF" stroke="#1D1D1B" strokeWidth="2" />
    <path d="M100 85 L 108 92 L 105 102 L 95 102 L 92 92 Z" fill="#1D1D1B" />
    <path d="M100 85 L 100 80 M 108 92 L 115 95 M 105 102 L 108 110 M 95 102 L 92 110 M 92 92 L 85 95" stroke="#1D1D1B" strokeWidth="1" />

    {/* Rising Arrow */}
    <path d="M80 135 L 125 75 M 125 75 L 105 75 M 125 75 L 125 95" stroke="#1CB59F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
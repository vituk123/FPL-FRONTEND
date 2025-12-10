import React, { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: any;
  inactiveTransition?: any;
  wrapperClassName?: string;
  innerClassName?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 20,
  disabled = false,
  magnetStrength = 2,
  activeTransition = { type: 'spring', damping: 10, stiffness: 200, mass: 0.5 },
  inactiveTransition = { type: 'spring', damping: 15, stiffness: 150, mass: 0.5 },
  wrapperClassName = "",
  innerClassName = ""
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = (clientX - centerX);
    const distY = (clientY - centerY);

    setPosition({ x: distX / magnetStrength, y: distY / magnetStrength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={wrapperClassName}
        style={{ padding: padding }}
    >
      <motion.div
        animate={{ x, y }}
        transition={x === 0 && y === 0 ? inactiveTransition : activeTransition}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </div>
  );
};
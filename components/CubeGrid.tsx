import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CubeGrid: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  // Grid configuration
  const rows = 6;
  const cols = 8;
  const total = rows * cols;

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly light up a few cubes
      const count = Math.floor(Math.random() * 3) + 1;
      const newIndices = Array.from({ length: count }, () => Math.floor(Math.random() * total));
      setActiveIndices(prev => {
        // Keep some previous ones to create a trail effect, limit total active
        const combined = [...prev, ...newIndices];
        return combined.slice(-10); 
      });
    }, 400);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="relative w-full h-[400px] perspective-[1000px] flex items-center justify-center overflow-hidden">
      <div 
        className="grid gap-2 transform rotate-x-[60deg] rotate-z-[-45deg] scale-75 md:scale-100"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: 'fit-content'
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isActive = activeIndices.includes(i);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: isActive ? 1 : 0.1,
                backgroundColor: isActive ? '#2dd4bf' : '#1e293b', // cordon-400 vs slate-800
                scale: isActive ? 1.1 : 1,
                z: isActive ? 20 : 0,
                boxShadow: isActive ? '0 0 20px 2px rgba(45, 212, 191, 0.6)' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 md:w-12 md:h-12 border border-slate-700/50 rounded-sm relative"
            >
              {/* Internal detail to look like data block */}
              {isActive && (
                <div className="absolute inset-1 border border-teal-900/30 bg-teal-50/10"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CubeGrid;
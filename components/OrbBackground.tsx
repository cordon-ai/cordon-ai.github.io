import React from 'react';
import { motion } from 'framer-motion';

const OrbBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Primary Teal Orb - Reduced Opacity */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05], // Lowered opacity further to let main Orb shine
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cordon-600 blur-[120px] mix-blend-screen"
      />

      {/* Secondary Cyan Orb - Reduced Opacity */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05], // Lowered opacity further
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-teal-800 blur-[140px] mix-blend-screen"
      />
    </div>
  );
};

export default OrbBackground;
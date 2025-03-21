import React from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
  const initialPath = `M150 0 L150 ${window.innerHeight} Q-0 ${window.innerHeight / 2} 150 0`;
  const targetPath = `M150 0 L150 ${window.innerHeight} Q150 ${window.innerHeight / 2} 150 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg
      className="absolute top-0 -left-[149px] w-[150px] h-full fill-[#1C1D20] stroke-none"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}
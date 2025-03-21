"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animation variants
export const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

export const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

// Function to generate percentage array
function generatePercentageArray(): string[] {
  const numbers = new Set<number>([100]);
  while (numbers.size < 10) {
    numbers.add(Math.floor(Math.random() * 100) + 1);
  }
  return Array.from(numbers)
    .sort((a, b) => a - b)
    .map((num) => `${num}%`);
}

export default function Loader() {
  const [index, setIndex] = useState<number>(0);
  const [dimension, setDimension] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [words, setWords] = useState<string[]>(["0%"]);

  // Initialize words and dimensions
  useEffect(() => {
    setWords(generatePercentageArray());
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    // Update dimensions on resize
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate the percentage counter
  useEffect(() => {
    if (!words.length || index >= words.length - 1) return;

    const timeout = setTimeout(
      () => setIndex((prev) => prev + 1),
      index === 0 ? 650 : 150
    );
    return () => clearTimeout(timeout);
  }, [index, words]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[250] flex items-center justify-center h-screen w-screen bg-[#1c1d20]"
    >
      {dimension.width > 0 ? (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-white text-8xl md:text-9xl font-extrabold absolute z-[1]"
          >
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path variants={curve} initial="initial" exit="exit" fill="#141516" />
          </svg>
          </>
      ) : (
        // Fallback for initial render before dimensions are set
        <p className="flex items-center text-[#dadada] text-8xl md:text-9xl font-extrabold absolute z-[1]">
          0%
        </p>
      )}
    </motion.div>
  );
}
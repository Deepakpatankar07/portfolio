"use client";

import { motion } from "framer-motion";

interface ProjectProps {
  index: number;
  title: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
}

const titleVariant = {
  initial: { x: 0, opacity: 1 , transition: { duration: 0 } },
  hover: {
    x: -90,
    opacity: 0.5,
    transition: { duration: 0.2 },
  },
};

const descVariant = {
  initial: { x: 0, opacity: 1 , transition: { duration: 0 } },
  hover: {
    x: 90,
    opacity: 0.5,
    transition: { duration: 0.2 },
  },
};


export default function Project({ index, title, manageModal }: ProjectProps) {
  return (
    <motion.div
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      className="flex w-full justify-between items-center py-8 px-4 md:py-[50px] md:px-[100px] border-t border-[#27272a] cursor-pointer transition-all duration-200 last:border-b last:border-[#27272a]"
      initial="initial"
      whileHover="hover"
    >
      <motion.h2
        variants={titleVariant}
        className="w-fit whitespace-nowrap text-3xl md:text-[60px] m-0 font-normal transition-all duration-75"
      >
        {title}
      </motion.h2>
      <div className="flex flex-col gap-1 items-end">
        <motion.p
          variants={descVariant}
          className="transition-all duration-75 font-light text-xs md:text-base text-end md:text-inherit"
        >
          Design & Development
        </motion.p>
        <div className="md:hidden transition-all duration-75 font-light text-gray-600 text-end text-[10px]">
          click me
        </div>
      </div>
    </motion.div>
  );
}

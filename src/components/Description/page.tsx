"use client";
import { useInView, motion } from "framer-motion";
import { forwardRef, useRef } from "react";
import { Variants } from "framer-motion";
import CircleButton from "../Button/CircleButton";
import Magnetic from "../Magnetic/page";

export const slideUp: Variants = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const opacity: Variants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.4 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const Description = forwardRef<HTMLDivElement>((props, ref) => {
  const phrase = `Turning ideas into code, and code into experiences. Obsessed with the "how", driven by the "why". From frontend pixels to backend logic — always building, always learning. No fluff, just clean, functional web.`;
  const description = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(description, { once: false });
  const isSecondSectionInView = useInView(secondSectionRef, {
    once: false,
    margin: "0px 0px -10% 0px", // Trigger when the element is 10% above the bottom
  });

  return (
    <div ref={ref} data-section="description" className="h-2/6 md:h-2/5 bg-[#f2f2f2] text-black flex item-start">
      <div ref={description} className="flex flex-col md:flex-row mt-24 mb-16 px-8 md:px-26 gap-8 md:gap-2">
        {/* First Section (70%) */}
        <div className="flex-[0.7] flex items-start justify-center">
          <div className="text-center">
            <div className="flex flex-wrap justify-center w-full pl-0 md:pl-12 md:gap-x-1 text-start">
              {phrase.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden inline-flex mr-0.75"
                >
                  <motion.span
                    variants={slideUp}
                    custom={index}
                    animate={isInView ? "open" : "closed"}
                    key={index}
                    className="inline-block text-xl md:text-3xl"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Section (30%) */}
        <div
          ref={secondSectionRef}
          className="flex-[0.3] flex flex-col items-center justify-start gap-8"
        >
          {/* Left-aligned paragraph */}
          <motion.p
            variants={opacity}
            animate={isSecondSectionInView ? "open" : "closed"}
            className="w-60 max-w-md font-light text-center mt-2"
          >
            <span className="text-md text-start">
              The combination of my passion for code, design and interaction — I build the web with intent.
            </span>
          </motion.p>

          {/* About Me Button */}
          <motion.div
            variants={opacity}
            animate={isSecondSectionInView ? "open" : "closed"}
            data-scroll
            data-scroll-speed="0.1"
            className="mt-6"
          >
            <Magnetic>
              <div className="w-35 h-35 bg-black text-white rounded-full flex items-center justify-center cursor-pointer overflow-hidden hover:text-white">
                <CircleButton>About me</CircleButton>
              </div>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

Description.displayName = "Description";
export default Description;
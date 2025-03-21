"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (circle.current) {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current.to(circle.current, {
        top: "0%",
        duration: 0.5,
        scale: 1.5,
        ease: "power3.in",
      }, "enter");
      timeline.current.to(circle.current, {
        top: "-150%",
        duration: 0.4,
        scale: 1,
        ease: "power3.out",
      }, "exit");
    }
  }, []);

  const handleMouseEnter = () => {
    if (timeline.current) {
      timeline.current.tweenFromTo("enter", "exit");
    }
  };

  const handleMouseLeave = () => {
    if (timeline.current) {
      timeline.current.play();
    }
  };

  return (
    <div
      className="rounded-full border border-gray-400 cursor-pointer relative flex items-center justify-center p-[2vmax_4vmax] hover:text-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-[1] transition-colors duration-400 ease-in hover:text-white">
        {children}
      </div>
      <div
        ref={circle}
        className="absolute w-full h-[150%] bg-[#144fff] rounded-full top-full"
      ></div>
    </div>
  );
};

export default Button;
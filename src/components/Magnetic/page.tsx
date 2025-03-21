"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement<any>;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const element = magnetic.current;
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic } as any);
};

export default Magnetic;


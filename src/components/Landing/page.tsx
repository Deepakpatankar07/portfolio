"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, Variants } from "framer-motion";
import CircleButton from "../Button/CircleButton";
import Magnetic from "../Magnetic/page";
import { TbWorld } from "react-icons/tb";
import BlobAnimation from "./BlobImage";

export const slideUp: Variants = {
  initial: { y: 0 },
  enter: { y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5 } },
};

export default function Landing() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null); // Ref for motion.main
  let xPercent: number = 0;
  let direction: number = -1;
  const animationFrameId = useRef<number | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!slider.current || !firstText.current || !secondText.current || !mainRef.current) {
      // console.log("One or more refs are null, skipping animation setup");
      return;
    }

    const firstTextWidth = firstText.current.getBoundingClientRect().width || 0;
    gsap.set(secondText.current, { left: firstTextWidth });

    const tl = gsap.to(slider.current, {
      scrollTrigger: {
        trigger: mainRef.current, // Use motion.main as trigger instead of document.documentElement
        scrub: 0.25,
        start: "top top",
        end: "bottom top",
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      // console.log("Cleaning up Landing animations");
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      tl.kill(); // Only kill this specific timeline
    };
  }, []);

  const animate = () => {
    if (!firstText.current || !secondText.current) {
      // console.log("Text refs are null, stopping animation");
      return;
    }

    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.1 * direction;

    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <motion.main
      ref={mainRef}
      variants={slideUp}
      initial="initial"
      animate="enter"
      className="relative flex flex-col min-h-screen h-fit md:h-[110vh] overflow-hidden bg-[#1c1d20]"
    >
      <div className="relative flex flex-col md:flex-row md:h-fit mt-28 md:mt-16 md:px-24">
        <div className="flex-[0.5] md:flex-[0.6] flex items-center justify-center md:ml-16">
          <Magnetic>
            <BlobAnimation />
          </Magnetic>
        </div>
        <div className="flex-[0.5] md:flex-[0.4] flex items-center justify-center pt-4 md:py-0 px-8 md:pt-0">
          <div className="flex md:flex-col items-start text-white gap-6 md:gap-0">
            <Magnetic>
              <div className="w-20 h-20 md:mb-20 text-white border rounded-full flex items-center justify-center cursor-pointer overflow-hidden hover:text-white">
                <CircleButton>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-200"
                  >
                    <path
                      d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                      fill="white"
                    />
                  </svg>
                </CircleButton>
              </div>
            </Magnetic>
            <div className="">
              <p className="text-3xl mb-2.5 font-light">Web Developer</p>
              <div className="text-xl flex items-center gap-2.5">
                <span>Located in India</span>
                <Magnetic>
                  <span className="mb-0.5">
                    <TbWorld className="text-[#144fff] font-extralight text-3xl" />
                  </span>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden relative md:absolute bottom-0 md:-bottom-2 mt-6 mb-12 md:mt-0">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="inline-block text-white text-[100px] md:text-[160px] font-medium pr-12"
          >
            Deepak Patankar —
          </p>
          <p
            ref={secondText}
            className="absolute top-0 text-white text-[100px] md:text-[160px] font-medium pr-12"
          >
            Deepak Patankar —
          </p>
        </div>
      </div>
    </motion.main>
  );
}
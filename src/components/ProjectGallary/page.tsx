"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Button from "../Button/Button";
import Project from "../ProjectList/page";
import { useRouter } from "next/navigation";

const projects = [
  {
    title: "EL Meet",
    src: "/images/el-meet.png",
    color: "#d8d3cd",
    hostedUrl: undefined,
  },
  {
    title: "Zapier",
    src: "/images/zapier.png",
    color: "#b1a994",
    hostedUrl: undefined,
  },
  {
    title: "Crypto Wallet",
    src: "/images/crypto-wallet.png",
    color: "#706D63",
    hostedUrl: "https://dwallets-crypto.vercel.app",
  },
  {
    title: "Infinite Gallery",
    src: "/images/infinite-gallery.png",
    color: "#8C8C8C",
    hostedUrl: "https://infinite-image-gallery-nu.vercel.app",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // console.log("Clicked Element:", (event.target as HTMLElement));

      //Check if click happened inside the View button
      let isInsideViewButton = false;
      if (cursorLabel.current) {
        const rect = cursorLabel.current.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;

        isInsideViewButton =
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom;
      }

      //If clicked inside View, trigger navigation
      if (isInsideViewButton) {
        console.log("View button clicked");

        if (modal.active) {
          const project = projects[modal.index];
          if (
            project.hostedUrl &&
            project.hostedUrl.length > 0 &&
            !project.hostedUrl.startsWith("#")
          ) {
            window.open(project.hostedUrl, "_blank");
          } else {
            router.push(`/projects`);
          }
        }

        event.stopPropagation(); //Stop bubbling
        return;
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [modal.active, modal.index, router]);

  const xMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const yMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (modalContainer.current && cursor.current && cursorLabel.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
        duration: 0.8,
        ease: "power3",
      });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
        duration: 0.8,
        ease: "power3",
      });
      xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
        duration: 0.5,
        ease: "power3",
      });
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
        duration: 0.45,
        ease: "power3",
      });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
        duration: 0.45,
        ease: "power3",
      });
    }
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
      className="bg-[#f2f2f2] text-black flex items-center flex-col px-4 md:px-28 pb-16 md:pb-20"
    >
      <div className="text-center md:text-left w-full md:pl-32 mb-12 opacity-50">
        Projects
      </div>
      <motion.div className=" w-full flex flex-col items-center justify-center mb-16 md:mb-[100px]">
        {projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            title={project.title}
            manageModal={manageModal}
          />
        ))}
      </motion.div>
      <div onClick={() => router.push("/projects")} className="cursor-pointer">
        <Button>
          <div>More project</div>
        </Button>
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="w-[300px] h-[250px] md:h-[300px] md:w-[400px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-[3]"
        >
          <div
            style={{ top: index * -100 + "%" }}
            className="h-full w-full relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          >
            {projects.map((project, index) => (
              <div
                key={`modal_${index}`}
                className="h-full w-full flex items-center justify-center"
                style={{ backgroundColor: project.color }}
              >
                {/* <Image
                  src={`${project.src}`}
                  width={300}
                  height={0}
                  alt="image"
                /> */}
                <Image
                  src={project.src}
                  alt="image"
                  width={300} // Default for portrait
                  height={0}
                  sizes="(max-width: 768px) 250px, (min-width: 1024px) 300px" // Dynamic sizes
                  className="w-[250px] h-[150px] md:w-[350px] md:h-[200px]"
                />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="w-[80px] h-[80px] rounded-full bg-[#455CE9] text-white fixed z-[3] flex items-center justify-center text-sm font-light pointer-events-none"
        ></motion.div>
        <motion.div
          id="view-button-Id"
          ref={cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="view-button w-[80px] h-[80px] rounded-full bg-transparent text-white fixed z-[3] flex items-center justify-center text-sm font-light pointer-events-none"
        >
          View
        </motion.div>
      </>
    </main>
  );
}

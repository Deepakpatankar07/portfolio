"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "./Link";
import Link from "next/link";
import Curve from "./Curve";
import { navItems } from "../Header/page";

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function NavMenu({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname);

  const handleNavClick = (title: string, href: string) => {
    if (title === "About" || title === "Contact") {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          scrollToSection(title);
          if (onClose) onClose();
        }, 700);
      } else {
        scrollToSection(title);
        if (onClose) onClose();
      }
    } else {
      router.push(href);
      if (onClose) onClose();
    }
  };

  const scrollToSection = (title: string) => {
    const section = title === "About" ? "description" : "skills";
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`Element with data-section="${section}" not found`); 
    }
  };
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed h-screen bg-[#1c1d20] right-0 top-0 text-white z-[90] w-[300px] md:w-[400px]"
    >
      <div className="box-border h-full pl-16 pr-8 md:px-16 flex flex-col justify-between gap-16">
        <div
          onMouseLeave={() => setSelectedIndicator(pathname)}
          className="flex flex-col text-3xl md:text-4xl gap-4 md:gap-6 mt-36 md:mt-24"
        >
          <div className="text-[#999999] border-b border-[#999999] uppercase text-xs md:text-[11px] mb-6">
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => (
            <NavLink
              key={index}
              data={{ ...data, index }}
              isActive={selectedIndicator === data.href}
              setSelectedIndicator={setSelectedIndicator}
              onClick={() => handleNavClick(data.title, data.href)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 mb-40 md:mb-24">
          <span className="text-gray-500 text-start uppercase text-[10px]">
            Socials
          </span>
          <div className="flex md:flex-row flex-wrap w-full gap-6 text-sm md:text-base">
            <Link
              href="https://github.com/Deepakpatankar07"
              className="hover:underline"
            >
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/deepak-patankar"
              className="hover:underline"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:deepakpatankar7227@gmail.com"
              className="hover:underline"
            >
              Email
            </Link>
          </div>
        </div>

        <Curve />
      </div>
    </motion.div>
  );
}

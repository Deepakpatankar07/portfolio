"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Magnetic from "@/components/Magnetic/page";
import { AnimatePresence } from "framer-motion";
import NavMenu from "../NavMenu/NavMenu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavItem {
  title: string;
  href: string;
}

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Resume", href: "/resume" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export default function Header() {
  const router = useRouter();
  const header = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();
  const button = useRef<HTMLDivElement>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);

  const isProjectPage = pathname === "/projects" || pathname === "/resume";
  const textColor = isProjectPage ? "text-black" : "text-white";
  const dotColor = isProjectPage ? "bg-black" : "bg-white";
  const hamburgerColor = isProjectPage ? "before:bg-black after:bg-black" : "before:bg-white after:bg-white";

  useEffect(() => {
    setIsActive(false);
    setSelectedIndicator(pathname);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!button.current) {
      // console.log("button.current is null, skipping animation setup");
      return;
    }

    // console.log("Setting up ScrollTrigger for button:", button.current);

    gsap.set(button.current, { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "80px top",
        onLeave: () => {
          // console.log("ScrollTrigger onLeave: Showing button");
          gsap.to(button.current, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setIsButtonVisible(true);
              // console.log("Button visible");
            },
          });
        },
        onLeaveBack: () => {
          // console.log("ScrollTrigger onLeaveBack: Hiding button");
          gsap.to(button.current, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setIsButtonVisible(false);
              // console.log("Button hidden");
            },
          });
          setIsActive(false);
        },
      },
    });

    const initialScroll = window.scrollY;
    // console.log("Initial scroll position:", initialScroll);
    if (initialScroll >= 80) {
      // console.log("Initial scroll >= 80px, showing button");
      gsap.to(button.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setIsButtonVisible(true),
      });
    }

    // Delay refresh to ensure Landing animations are set up
    setTimeout(() => {
      ScrollTrigger.refresh();
      // console.log("ScrollTrigger refreshed in Header");
    }, 100);

    return () => {
      // console.log("Cleaning up ScrollTrigger in Header");
      tl.kill();
    };
  }, []);

  const handleNavClick = (title: string, href: string) => {
    if (title === "About" || title === "Contact") {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => scrollToSection(title), 100);
      } else {
        scrollToSection(title);
      }
    } else {
      router.push(href);
    }
  };

  const scrollToSection = (title: string) => {
    const section = title === "About" ? "description" : "skills";
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={header}
        className={`absolute flex z-[100] top-0 px-8 md:px-16 py-12 md:py-6 justify-between w-full font-light box-border items-center bg-transparent ${textColor}`}
      >
        <div className="flex cursor-pointer group">
          <p className="m-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-[360deg]">
            ©
          </p>
          <div className="flex relative overflow-hidden whitespace-nowrap ml-[5px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:pr-[30px]">
            <p className="m-0 relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">
              Code by
            </p>
            <p className="m-0 relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pl-[0.3em] group-hover:-translate-x-[65px]">
              Deepak
            </p>
            <p className="m-0 absolute left-[120px] pl-[0.3em] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[65px]">
              Patankar
            </p>
          </div>
        </div>
        <div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Magnetic key={item.title}>
                <div
                  className="flex flex-col relative z-[1] py-[15px] cursor-pointer group"
                  onClick={() => handleNavClick(item.title, item.href)}
                >
                  <span>{item.title}</span>
                  <div
                    className={`absolute w-[5px] h-[5px] top-[45px] left-1/2 ${dotColor} rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`}
                  ></div>
                </div>
              </Magnetic>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <Magnetic>
              <div
                onClick={() => setIsActive(!isActive)}
                className="relative mt-1 w-6 cursor-pointer flex items-center justify-center"
              >
                <div
                  className={`w-full relative z-[1] before:content-[''] before:block before:h-[1px] before:w-[100%] before:mx-auto ${hamburgerColor} before:relative before:transition-transform before:duration-300 after:content-[''] after:block after:h-[1px] after:w-[100%] after:mx-auto ${hamburgerColor} after:relative after:transition-transform after:duration-300 ${
                    isActive
                      ? "before:rotate-45 before:-top-[1px] after:-rotate-45 after:top-0"
                      : "before:-top-[3px] after:top-[3px] md:-top-[5px] md:after:top-[5px]"
                  }`}
                ></div>
                <div
                  className={`absolute z-10 w-[5px] h-[5px] top-[45px] left-1/2 ${dotColor} rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100`}
                ></div>
              </div>
            </Magnetic>
          </div>
        </div>
      </div>

      <div
        ref={button}
        className={`fixed right-0 top-0 z-[200] ${
          isButtonVisible ? "opacity-100" : "opacity-0 scale-0"
        }`}
      >
        <Magnetic>
          <div
            onClick={() => setIsActive(!isActive)}
            className="relative m-5 w-[80px] h-[80px] rounded-full border-[0.5px] bg-[#1C1D20] cursor-pointer flex items-center justify-center"
          >
            <div
              className={`w-full relative z-[1] before:content-[''] before:block before:h-[1px] before:w-[40%] before:mx-auto before:bg-white before:relative before:transition-transform before:duration-300 after:content-[''] after:block after:h-[1px] after:w-[40%] after:mx-auto after:bg-white after:relative after:transition-transform after:duration-300 ${
                isActive
                  ? "before:rotate-45 before:-top-[1px] after:-rotate-45 after:top-0"
                  : "before:-top-[5px] after:top-[5px]"
              }`}
            ></div>
          </div>
        </Magnetic>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <NavMenu onClose={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
}
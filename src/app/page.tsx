"use client";
import { useEffect, useRef, useState } from "react";
import Description from "@/components/Description/page";
import Landing from "@/components/Landing/page";
import Gallary from "@/components/ProjectGallary/page";
import Skills from "@/components/Skills/page";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/page";
import { getAppLoaded, setAppLoaded } from "@/lib/loadingState";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(!getAppLoaded());
  const descriptionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a ref
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setAppLoaded();
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {!isLoading && (
        <>
          <Landing />
          <Description ref={descriptionRef} />
          <Gallary />
          <Skills ref={skillsRef} />
        </>
      )}
    </main>
  );
}

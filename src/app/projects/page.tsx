"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// Your project data
const projects = [
  {
    title: "EL Meet",
    demo: undefined,
    hostedUrl: "#",
    githubUrl: "https://github.com/DeepakPatankar07/el-meet",
    services: "Design & Development",
    year: "2025",
  },
  {
    title: "Zapier",
    demo: undefined,
    hostedUrl: "#",
    githubUrl: "https://github.com/DeepakPatankar07/zapier-turborepo",
    services: "Design & Development",
    year: "2025",
  },
  {
    title: "Cryto Wallet",
    demo: undefined,
    hostedUrl: "https://dwallets-crypto.vercel.app",
    githubUrl: "https://github.com/DeepakPatankar07/crypto-wallets",
    services: "Design & Development",
    year: "2024",
  },
  {
    title: "Infinite Gallary",
    demo: undefined,
    hostedUrl: "https://infinite-image-gallery-nu.vercel.app",
    githubUrl: "https://github.com/DeepakPatankar07/infinite-image-gallery",
    services: "Design & Development",
    year: "2024",
  },
  {
    title: "Wallet Adapter",
    demo: undefined,
    hostedUrl: "#",
    githubUrl: "https://github.com/DeepakPatankar07/wallet-adapter",
    services: "Design & Development",
    year: "2024",
  },
  {
    title: "Fromluke",
    demo: undefined,
    hostedUrl: "https://deepakpatankar07.github.io/Fromluke-Project",
    githubUrl: "https://github.com/DeepakPatankar07/Fromluke-Project",
    services: "Design & Development",
    year: "2024",
  },
];

const titleVariant = {
  initial: { x: 0, opacity: 1, transition: { duration: 0 } },
  hover: {
    x: -20,
    opacity: 0.67,
    transition: { duration: 0.2 },
  },
};

const otherVariant = {
  initial: { x: 0, opacity: 1, transition: { duration: 0 } },
  hover: {
    x: 10,
    opacity: 0.67,
    transition: { duration: 0.2 },
  },
};

const Work = () => {
  const [modal, setModal] = useState({ active: false, videoSrc: "" });

  // Function to open/close the modal
  const manageModal = (active: boolean, videoSrc = "") => {
    if(!videoSrc || videoSrc.length === 0 || videoSrc.startsWith("#")) return;
    setModal({ active, videoSrc });
  };

  return (
    <div className="flex items-start justify-center w-full min-h-screen h-fit bg-[#f2f2f2] text-black py-28 md:py-32">
      <div className="w-full max-w-5xl">
        {/* Work Header */}
        <div className="flex w-fit mt-16 px-4 md:px-8 ">
          <h1 className="text-5xl md:text-7xl font-normal text-black/90 mb-8">
            Project
          </h1>
          <div className="flex items-start px-2">
            <div className="text-3xl -mt-4 text-zinc-600">({projects.length})</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {/* Grid Table Header */}
          <div className="px-8 md:px-12 py-6 md:py-10 grid grid-cols-[70%_30%] md:grid-cols-[40%_25%_25%_10%] w-[100%] justify-center items-center gap-4  text-[10px] md:text-xs font-light text-gray-400 ">
            <div className="text-start ">PROJECT</div>
            <div className="text-center hidden md:inline-block">LINKS</div>
            <div className="text-end md:text-center ">ABOUT</div>
            <div className="text-end hidden md:inline-block">YEAR</div>
          </div>

          {/* Project Rows */}
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="px-6 md:px-12 py-8 md:py-10 w-[100%] grid grid-cols-[70%_30%] md:grid-cols-[40%_25%_25%_10%] justify-center items-center gap-4  border-t border-gray-300 md:border-gray-400 cursor-pointer transition-all duration-200 last:border-b last:border-b-gray-300 md:last:border-b-gray-400"
              initial="initial"
              whileHover="hover"
            >
              {/* Client */}
              <motion.div
                variants={titleVariant}
                className="text-3xl md:text-5xl font-normal"
              >
                {project.title}
              </motion.div>

              {/* Links (Demo/Website + Github) */}
              <motion.div
                variants={otherVariant}
                className="flex gap-4 md:gap-8 text-sm md:text-base justify-end md:justify-center font-light text-black"
              >
                {project.hostedUrl &&
                project.hostedUrl.length > 0 &&
                !project.hostedUrl.startsWith("#") ? (
                  <div className="text-black">
                    <Link
                      href={project.hostedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="!text-black hover:text-gray-600"
                    >
                      Website
                    </Link>
                  </div>
                ) : (
                  <div
                    onClick={() => manageModal(true, project.demo)}
                    className="cursor-pointer hover:text-gray-600"
                  >
                    Demo
                  </div>
                )}
                <div className="text-black">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="!text-black hover:text-gray-600"
                  >
                    Github
                  </Link>
                </div>
              </motion.div>

              {/* Services */}
              <motion.div
                variants={otherVariant}
                className="text-start md:text-center text-xs md:text-base font-light"
              >
                {project.services}
              </motion.div>

              {/* Year */}
              <motion.div
                variants={otherVariant}
                className="text-end text-xs md:Text-base font-light"
              >
                {project.year}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for Demo Video */}
      {modal.active && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-80 flex items-center justify-center z-50">
          <div className="flex flex-col border-2 border-white bg-[#c9c9c9] px-4 pb-4  md:p-4 rounded-lg">
            {/* Close Button */}
            <div className="flex justify-end">
            <button
              onClick={() => manageModal(false)}
              className="text-black text-3xl mb-2 md:mb-4 font-extralight"
            >
              &times;
            </button>
            </div>

            {/* Video Player */}
            <video src={modal.videoSrc} controls className="w-[300px] h-fit md:w-[600px] md:h-fit"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;

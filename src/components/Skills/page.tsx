"use client"
import React, { forwardRef, useEffect, useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiExpress,
  SiTurborepo,
  SiHtml5,
  SiTailwindcss,
  SiRedux,
  SiWebrtc,
  SiApachekafka,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaNode, FaAws } from "react-icons/fa";
import { DiRedis } from "react-icons/di";
import CircleButton from "../Button/CircleButton";
import Link from "next/link";
import Magnetic from "../Magnetic/page";

const skills = [
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiReact />, name: "React" },
  { icon: <FaNode />, name: "Node.js" },
  { icon: <SiExpress />, name: "Express" },
  { icon: <SiTurborepo />, name: "Turborepo" },
  { icon: <SiHtml5 />, name: "HTML5" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <SiRedux />, name: "Redux" },
  { icon: <SiWebrtc />, name: "WebRTC" },
  { icon: <SiApachekafka />, name: "Kafka" },
  { icon: <DiRedis />, name: "Redis" },
  { icon: <SiPrisma />, name: "Prisma" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiDocker />, name: "Docker" },
  { icon: <SiKubernetes />, name: "Kubernetes" },
  { icon: <SiGithubactions />, name: "GitHub Actions" },
  { icon: <FaAws />, name: "AWS" },
  { icon: <SiGithub />, name: "GitHub" },
  { icon: <SiPostman />, name: "Postman" },
];

const Skills = forwardRef<HTMLDivElement>((props, ref) => {
    const [localTime, setLocalTime] = useState<string>("");

  const getYear = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const gmtOffset = now.getTimezoneOffset() / -60; // Get GMT offset

      setLocalTime(`${hours}:${minutes} ${timeZone} GMT${gmtOffset >= 0 ? "+" : ""}${gmtOffset}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div ref={ref}  className="min-h-screen pb-4  w-full bg-[#1c1d20] md:px-28 flex flex-col pt-16 md:pt-20 justify-between gap-12">
      <div className="flex flex-col md:flex-row pb-4 gap-16 md:gap-0">
        <div className="flex-[0.4] px-6 flex justify-between items-center md:flex-col md:items-center md:justify-start md:gap-16">
          <div className="flex justify-start w-fit md:w-full md:pl-8">
            {/* About Me Button */}
            <div data-scroll data-scroll-speed="0.1" className="">
              <Magnetic>
                <div className="w-28 h-28 md:w-34 md:h-34 border border-white text-white text-xl rounded-full flex items-center justify-center cursor-pointer overflow-hidden hover:text-white">
                    <CircleButton>Skills</CircleButton>
                </div>
              </Magnetic>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="text-white text-[38px] md:text-7xl font-normal">
              Let's work <br /> together
            </div>
          </div>
        </div>
        <div className="flex-[0.6] flex items-center justify-center w-full md:w-[inherit] px-8">
          <div className="grid w-full md:w-[inherit] grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4 md:grid-cols-6 md:gap-6 ">

            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center border border-white p-4 rounded-lg hover:bg-[#144fff] hover:text-black transition duration-300"
              >
                <div className="text-2xl md:text-4xl">{skill.icon}</div>
                <span className="absolute z-20 top-full mt-2 px-2 py-1 bg-zinc-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition duration-300">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div data-section="skills" className="bg-[#1c1d20] w-full h-1/2 flex flex-col-reverse px-8 gap-12 md:gap-0 md:px-0 md:flex-row md:items-center md:justify-between text-white text-sm mb-8">
        {/* Left Section (Version & Local Time) */}
        <div className="flex w-full justify-between md:justify-normal gap-8 md:gap-16">
          <div className="flex flex-col gap-4 w-fit whitespace-nowrap">
            <span className="text-gray-500 uppercase text-[10px]">Version</span>
            <span className="font-normal">{getYear} © Edition</span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-gray-500 uppercase text-[10px] text-end md:text-start">Local Time</span>
            <span className="font-normal text-end md:text-start">{localTime}</span>
          </div>
        </div>

        {/* Right Section (Socials) */}
        <div className="flex flex-col gap-4">
          <span className="text-gray-500 text-start uppercase text-[10px]">Socials</span>
          <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8">
            <Link href="https://github.com/Deepakpatankar07" className="hover:underline">
              Github
            </Link>
            <Link href="https://www.Linkedin.com/deepak-patankar" className="px-2 md:px-0 hover:underline">
              LinkedIn
            </Link>
            <div className="cursor-pointer hover:underline w-fit whitespace-nowrap">
              +91 6263 128 437
            </div>
            <Link href="mailto:deepakpatankar7227@gmail.com" className="hover:underline">
              deepakpatankar7227@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Skills.displayName = "Skills";

export default Skills;

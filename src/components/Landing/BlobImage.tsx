"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BlobAnimation: React.FC = () => {
  const blobRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        attr: {
          d: "M115.4 -137.9C137.9 -92.9 136.4 -46.4 133.6 -2.8C130.8 40.8 126.6 81.6 104.1 118.4C81.6 155.2 40.8 188.1 -8.4 196.5C-57.5 204.8 -115 188.7 -151 151.9C-187 115 -201.5 57.5 -190.8 10.7C-180.1 -36.1 -144.1 -72.1 -108.1 -117.1C-72.1 -162.1 -36.1 -216.1 5.2 -221.2C46.4 -226.4 92.9 -182.9 115.4 -137.9"
        },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <section className="overflow-hidden relative flex flex-col items-center">
      <svg
        className="w-[350px] h-[350px] md:w-[400px] md:h-[400px]"
        id="visual"
        viewBox="0 0 500 500"
        // width="400"
        // height="400"
        style={{ transform: "translateY(0)" }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <pattern
            id="imgPattern"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse" 
            width="400"  // Match viewBox width
            height="550" // Match viewBox height
            x="-200"     // Center horizontally
            y="-230"     // Center vertically
            style={{ background: "white"}}
          >
            <image
              href="/images/myimage.png"
              width="400"  // Match pattern width
              height="550" // Match pattern height
              preserveAspectRatio="none" // Fill pattern
             y="0" // Center vertically
             style={{ background: "white"}}
            />
          </pattern>
        </defs>
        <g transform="translate(250 250)">
          <path
            ref={blobRef}
            d="M148.7 -134.9C193.7 -103.7 231.9 -51.9 232.4 0.6C233 53 196.1 106.1 151.1 128.6C106.1 151.1 53 143 -4.4 147.4C-61.8 151.8 -123.5 168.5 -151.2 146C-178.8 123.5 -172.4 61.8 -172.8 -0.4C-173.1 -62.5 -180.3 -124.9 -152.6 -156.1C-124.9 -187.3 -62.5 -187.1 -5.3 -181.8C51.9 -176.5 103.7 -166 148.7 -134.9"
            fill="url(#imgPattern)"
            stroke="#144fff"
            strokeWidth="6"
          />
        </g>
      </svg>
    </section>
  );
};

export default BlobAnimation;
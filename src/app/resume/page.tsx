"use client";
import { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Magnetic from "@/components/Magnetic/page";
import Button from "@/components/Button/Button";

export default function Resume() {
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const resumeUrl: string = `${process.env.NEXT_PUBLIC_RESUME_URL}` || "/Deepak_Patankar_Resume.pdf";

  // Fallback to error state if the PDF doesn't load within a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError(true);
        setIsLoading(false);
      }
    }, 10000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleDownload = () => {
    console.log("Downloading from:", resumeUrl);
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Deepak_Patankar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-start justify-center w-full min-h-screen bg-gradient-to-b from-[#e6e9f0] to-[#f2f2f2] px-4 py-28">
      <div className="flex flex-col items-center w-full max-w-4xl">
        {/* PDF Viewer Container */}
        <div
          className={`relative w-full bg-white shadow-2xl overflow-hidden border transition-all duration-500 hover:shadow-3xl ${
            !isError ? "rounded-2xl" : "rounded-none"
          }`}
        >
          <div className="relative w-full overflow-y-auto overflow-x-hidden scrollbar-hidden">
            {isError ? (
              <div className="w-full bg-white">
                {/* Fallback: Iframe */}
                <iframe
                  src={`${resumeUrl}#scrollbar=0&statusbar=0&zoom=page-width&toolbar=0&navpanes=0`}
                  title="Resume"
                  className="w-full h-[80vh] border-none"
                  style={{ background: "white !important" }}
                  allow="autoplay; fullscreen"
                />
              </div>
            ) : (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={resumeUrl}
                  theme={{
                    theme: "light",
                  }}
                  onDocumentLoad={() => {
                    setIsLoading(false);
                  }}
                  renderLoader={(percentages: number) => (
                    <div className="flex items-center justify-center h-[80vh]">
                      <div className="text-gray-500">
                        Loading... {Math.round(percentages)}%
                      </div>
                    </div>
                  )}
                  // defaultScale={1} // Adjust scale to fit container
                />
              </Worker>
            )}
          </div>

          {/* Gradient Overlays for Visual Effect */}
          {!isError && (
            <>
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#1c1d20]/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#144fff]/20 to-transparent rounded-tl-full pointer-events-none" />
            </>
          )}
        </div>

        {/* Download Button */}
        <div className={`${isLoading ? "hidden" : "block"}`}>
          <Magnetic>
            <div
              onClick={handleDownload}
              className="w-fit h-fit mt-14 mb-0 md:mt-24 md:mb-10 text-black rounded-full flex items-center justify-center cursor-pointer overflow-hidden hover:text-white"
            >
              <Button>
                <div className="flex items-center gap-2 font-light md:font-normal">
                  <p className="flex gap-2 ">
                    Download <span className="hidden md:block">Resume</span>
                  </p>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4m4-4l-4 4"
                    />
                  </svg>
                </div>
              </Button>
            </div>
          </Magnetic>
        </div>
      </div>
    </div>  
  );
}

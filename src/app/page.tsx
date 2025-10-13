"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    // Detect mobile devices (iOS/Android) to disable custom play overlay
    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const smallViewport =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isIOS || isAndroid || smallViewport);

    // Try to play video after a short delay
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Intentionally no overlay fallback
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/vantir-poster.jpg"
          className="absolute inset-0 z-0 w-full h-full object-cover"
          onLoadStart={() => {}}
          onCanPlay={() => {
            setShowPoster(false);
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          onLoadedData={() => {
            setShowPoster(false);
          }}
          onPlay={() => {
            setShowPoster(false);
          }}
        >
          <source src="/vantir webm.webm" type="video/webm" />
          <source src="/vantir-norrsken.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Poster overlay while video is loading or unavailable */}
        {showPoster && (
          <img
            src="/vantir-poster.jpg"
            alt="Vantir background poster"
            className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        )}

        {/* Fallback gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #047857 100%)",
          }}
        ></div>

        {/* Header */}
        <header className="relative z-20 flex justify-between items-center p-4 sm:p-6 md:p-8">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="Vantir Logo"
              width={199}
              height={38}
              priority
              draggable={false}
              className="w-40 sm:w-44 md:w-48 lg:w-52 h-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center">
            <div
              className="flex items-center px-6 py-3 rounded-lg"
              style={{
                background:
                  "linear-gradient(90deg, rgba(24, 74, 75, 0.7) 0%, rgba(4, 34, 34, 0.7) 95%)",
                border: "1px solid rgba(45, 193, 149, 0.4)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <a
                href="#"
                className="text-[#BDFFE1] hover:text-white transition-colors px-4 font-['Manrope']"
              >
                Consulting
              </a>
              <a
                href="#"
                className="text-[#BDFFE1] hover:text-white transition-colors px-4 font-['Manrope']"
              >
                Technical Due Diligence
              </a>
              <a
                href="#"
                className="text-[#BDFFE1] hover:text-white transition-colors px-4 font-['Manrope']"
              >
                Ventures
              </a>
              <a
                href="#"
                className="text-[#BDFFE1] hover:text-white transition-colors px-4 font-['Manrope']"
              >
                Careers
              </a>
            </div>
          </nav>

          {/* CTA Button */}
          <button
            className="px-6 py-3 rounded-xl transition-colors font-['Manrope']"
            style={{
              background: "linear-gradient(90deg, #184A4B 0%, #042222 95%)",
              color: "#BDFFE1",
              border: "2px solid #BDFFE1",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            Get in touch
          </button>
        </header>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center -mt-16">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #F8F8F9 0%, #BDFFE1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "1.2",
              paddingBottom: "0.2em",
            }}
          >
            High stakes.
            <br />
            Higher standards.
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed">
            Action-biased consulting and venture
            <br />
            building for critical missions.
          </p>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <section className="bg-white py-48">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-2 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="text-black lg:col-span-1">
              <p
                className="leading-[110%]"
                style={{
                  fontFamily: "Manrope",
                  fontWeight: "600",
                  fontSize: "32px",
                  letterSpacing: "0%",
                }}
              >
                We help companies build, evaluate, and scale technology with
                clarity and precision — from technical due diligence and cloud,
                data, and AI consulting to supporting companies on their path to
                growth.
              </p>
            </div>

            {/* Right Content */}
            <div className="text-black text-left ml-32">
              <p
                style={{
                  fontFamily: "Manrope",
                  fontWeight: "500",
                  fontSize: "20px",
                  letterSpacing: "0%",
                }}
              >
                We don't just build solutions.
                <br />
                We enable your team to sustain,
                <br />
                adapt, and grow on their own.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

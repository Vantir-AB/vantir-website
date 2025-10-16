"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";

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

    // Try to play video with multiple attempts
    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.log("Autoplay failed:", error);
          // Try again after user interaction
          const handleUserInteraction = () => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("touchstart", handleUserInteraction);
          };
          document.addEventListener("click", handleUserInteraction);
          document.addEventListener("touchstart", handleUserInteraction);
        });
      }
    };

    // Try immediately and after delays
    const timer1 = setTimeout(attemptPlay, 100);
    const timer2 = setTimeout(attemptPlay, 500);
    const timer3 = setTimeout(attemptPlay, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
            // Try to play when video is ready
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
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
          onPause={() => {
            // If video pauses unexpectedly, try to play again
            setTimeout(() => {
              if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              }
            }, 100);
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
        <div className="absolute inset-0 -z-10 gradient-green-1"></div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center pt-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #F8F8F9 0%, #BDFFE1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "1.2",
              paddingBottom: "0.2em",
              fontWeight: "var(--font-display)",
            }}
          >
            High stakes.
            <br />
            Higher standards.
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed">
            Action-oriented consulting and venture
            <br />
            building for critical missions.
          </p>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <section
        className="py-48"
        style={{ backgroundColor: "var(--color-almost-white)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-2 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div
              className="lg:col-span-1"
              style={{ color: "var(--color-black)" }}
            >
              <p className="text-heading leading-[110%]">
                We help companies build, evaluate, and scale technology with
                clarity and precision — from technical due diligence and cloud,
                data, and AI consulting to supporting companies on their path to
                growth.
              </p>
            </div>

            {/* Right Content */}
            <div
              className="text-left ml-32"
              style={{ color: "var(--color-black)" }}
            >
              <p className="text-subtitle">
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

      {/* Our Services Section */}
      <section
        className="py-24"
        style={{ backgroundColor: "var(--color-dark-green)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-left"
              style={{
                color: "var(--color-almost-white)",
                fontWeight: "var(--font-display)",
              }}
            >
              The things we do
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              iconSrc="/homepage/2circle.svg"
              iconAlt="Consulting"
              title="Consulting"
              description="We help organizations design and implement cloud, data, and AI solutions that drive lasting business impact."
            />
            <ServiceCard
              iconSrc="/homepage/3circle.svg"
              iconAlt="Technical Due Diligence"
              title="Technical Due Diligence"
              description="We assess technology, architecture, and teams to reveal risks, strengths, and opportunities before you invest or scale."
            />
            <ServiceCard
              iconSrc="/homepage/bigsmallcircle.svg"
              iconAlt="Ventures"
              title="Ventures"
              description="We partner with early-stage companies, providing technical expertise and guidance to help ideas scale with clarity and precision."
            />
          </div>
        </div>
      </section>

      {/* Centered Text Section */}
      <section
        className="py-48"
        style={{ backgroundColor: "var(--color-almost-white)" }}
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <p
            className="text-heading leading-[110%]"
            style={{ color: "var(--color-black)" }}
          >
            We help companies master cloud,
            <br /> data & AI – and become self-
            <br />
            sufficient in the process.{" "}
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-48" style={{ background: "var(--gradient-dark)" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl">
            <div
              className="mb-6"
              style={{
                background: "var(--gradient-light-reversed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-left leading-tight"
                style={{
                  color: "transparent",
                  fontWeight: "var(--font-display)",
                }}
              >
                Let's build something lasting together.
              </h2>
            </div>
            <p
              className="text-subtitle mb-8 text-left"
              style={{ color: "var(--color-almost-white)" }}
            >
              Contact us to start the conversation.
            </p>
            <button
              className="px-12 py-3 rounded-lg transition-colors font-['Manrope'] text-button"
              style={{
                background: "var(--gradient-dark)",
                color: "var(--color-mint)",
                border: "2px solid var(--color-mint)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="h-96 lg:h-[500px] flex">
        {/* Left side - Background Image */}
        <div className="w-full lg:w-2/5 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/vantir-poster.jpg')",
              backgroundPosition: "top right",
            }}
          />
        </div>

        {/* Right side - Content */}
        <div
          className="w-full lg:w-3/5 flex items-center justify-start"
          style={{ backgroundColor: "var(--color-almost-white)" }}
        >
          <div className="max-w-2xl px-4 sm:px-6 md:px-8 lg:pl-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-left leading-tight"
              style={{
                color: "var(--color-dark-green)",
                fontWeight: "var(--font-display)",
              }}
            >
              Want to be part of
              <br />
              our team?
            </h2>
            <p
              className="text-subtitle mb-8 text-left"
              style={{ color: "var(--color-dark-green)" }}
            >
              We are looking for talented people to join us.
            </p>
            <button
              className="px-12 py-4 rounded-xl transition-colors font-['Manrope'] text-button mt-2"
              style={{
                background: "var(--gradient-light-reversed)",
                color: "var(--color-dark-green)",
                border: "2px solid var(--color-dark-green)",
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
          console.log('Autoplay failed:', error);
          // Try again after user interaction
          const handleUserInteraction = () => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
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

  // Navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 250) {
        // Only show sticky navbar when scrolled past the original header
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide navbar
          setShowNavbar(false);
        } else {
          // Scrolling up - show navbar
          setShowNavbar(true);
        }
      } else {
        // At the top - hide sticky navbar (original header is visible)
        setShowNavbar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
        <div
          className="absolute inset-0 -z-10 gradient-green-1"
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
                  "linear-gradient(90deg, color-mix(in srgb, var(--color-emerald) 70%, transparent) 0%, color-mix(in srgb, var(--color-dark-green) 70%, transparent) 95%)",
                border: "1px solid color-mix(in srgb, var(--color-mint) 40%, transparent)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <a
                href="#"
                className="hover:text-white transition-colors px-4 text-button"
                style={{ color: "var(--color-mint)" }}
              >
                Consulting
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors px-4 text-button"
                style={{ color: "var(--color-mint)" }}
              >
                Technical Due Diligence
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors px-4 text-button"
                style={{ color: "var(--color-mint)" }}
              >
                Ventures
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors px-4 text-button"
                style={{ color: "var(--color-mint)" }}
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

        {/* Sticky Navigation - Right side only */}
        <div 
          className={`fixed top-0 right-0 z-50 transition-opacity duration-500 ease-in-out p-4 sm:p-6 md:p-8 ${
            showNavbar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-4">
            {/* Navigation */}
            <div className="hidden md:flex items-center">
              <div
                className="flex items-center px-6 py-3 rounded-lg"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--color-emerald) 70%, transparent) 0%, color-mix(in srgb, var(--color-dark-green) 70%, transparent) 95%)",
                  border: "1px solid color-mix(in srgb, var(--color-mint) 40%, transparent)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <a
                  href="#"
                  className="hover:text-white transition-colors px-4 text-button"
                  style={{ color: "var(--color-mint)" }}
                >
                  Consulting
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors px-4 text-button"
                  style={{ color: "var(--color-mint)" }}
                >
                  Technical Due Diligence
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors px-4 text-button"
                  style={{ color: "var(--color-mint)" }}
                >
                  Ventures
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors px-4 text-button"
                  style={{ color: "var(--color-mint)" }}
                >
                  Careers
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="px-6 py-3 rounded-xl transition-colors text-button gradient-dark"
              style={{
                color: "var(--color-mint)",
                border: "2px solid var(--color-mint)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center -mt-16">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight"
            style={{
              color: "var(--color-almost-white)",
              lineHeight: "1.2",
              paddingBottom: "0.2em",
              fontWeight: "var(--font-display)",
            }}
          >
            High stakes.
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
      <section className="py-48" style={{ backgroundColor: "var(--color-almost-white)" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-2 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="lg:col-span-1" style={{ color: "var(--color-black)" }}>
              <p className="text-heading leading-[110%]">
                We help companies build, evaluate, and scale technology with
                clarity and precision — from technical due diligence and cloud,
                data, and AI consulting to supporting companies on their path to
                growth.
              </p>
            </div>

            {/* Right Content */}
            <div className="text-left ml-32" style={{ color: "var(--color-black)" }}>
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
      <section className="py-24" style={{ backgroundColor: "var(--color-dark-green)" }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-left"
              style={{ 
                color: "var(--color-almost-white)",
                fontWeight: "var(--font-display)"
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
    </div>
  );
}

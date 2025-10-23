"use client";

import { useState, useRef, useEffect } from "react";
import ServiceCard from "@/components/ServiceCard";
import { ShineBorder } from "@/components/ui/shine-border";
import { LightRays } from "@/components/ui/light-rays";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
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

    // Set normal playback rate
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
    }

    // Aggressive play attempts with immediate execution
    const attemptPlay = () => {
      if (videoRef.current && videoRef.current.paused) {
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

    // Try immediately and more frequently with additional attempts
    attemptPlay(); // Immediate attempt
    const timer1 = setTimeout(attemptPlay, 10);
    const timer2 = setTimeout(attemptPlay, 50);
    const timer3 = setTimeout(attemptPlay, 100);
    const timer4 = setTimeout(attemptPlay, 250);
    const timer5 = setTimeout(attemptPlay, 500);
    const timer6 = setTimeout(attemptPlay, 1000);

    // Add global event listeners for user interaction
    const handleUserInteraction = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };

    // Listen for any user interaction to trigger video play
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          ref={(el) => {
            videoRef.current = el;
            // Try to play immediately when video element is available
            if (el && el.paused) {
              setTimeout(() => el.play().catch(() => {}), 0);
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          className="absolute inset-0 z-0 w-full h-full object-cover"
          style={{
            ['WebkitMediaControlsOverlayPlayButton' as any]: 'display: none !important',
            ['WebkitMediaControlsPlayButton' as any]: 'display: none !important',
          }}
          onLoadStart={() => {
            console.log("Video loading started");
            // Try to play as soon as loading starts
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch((error) => {
                console.log("Play failed on load start:", error);
              });
            }
          }}
          onPlay={() => {
            console.log("Video is playing");
            setVideoLoaded(true);
            // Ensure playback rate is set
            if (videoRef.current) {
              videoRef.current.playbackRate = 1.0;
            }
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
            // Try to play immediately when video is ready
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          }}
          onLoadedMetadata={() => {
            console.log("Video metadata loaded");
            setVideoLoaded(true);
            // Try to play as soon as metadata is loaded
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch((error) => {
                console.log("Play failed on metadata loaded:", error);
              });
            }
          }}
          onError={(e) => {
            console.error("Video error:", e);
            e.currentTarget.style.display = "none";
          }}
          onLoadedData={() => {
            // Ensure normal playback
            if (videoRef.current) {
              videoRef.current.playbackRate = 1.0;
            }
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
          <source src="/background-new.mp4" type="video/mp4" />
          <source src="/background-new.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>


        {/* Fallback gradient background - only show if video fails */}
        <div 
          className="absolute inset-0 gradient-green-1 transition-opacity duration-500" 
          style={{ 
            zIndex: -1, 
            opacity: videoLoaded ? 0 : 0.3 
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center pt-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight select-none"
            style={{
              background: "linear-gradient(90deg, #F8F8F9 0%, #BDFFE1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: "1.2",
              paddingBottom: "0.2em",
              fontWeight: "var(--font-display)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            High stakes.
            <br />
            Higher standards.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--color-almost-white)" }}>
            Action-oriented consulting and venture
            <br />
            building for critical missions.
          </p>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <section
        className="py-16 sm:py-24 lg:py-48"
        style={{ backgroundColor: "var(--color-almost-white)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-2 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            {/* Left Content */}
            <div
              className="lg:col-span-2"
              style={{ color: "var(--color-black)" }}
            >
              <p className="text-heading leading-[110%]">
                We help companies build, evaluate, and scale technology with
                clarity and precision — from AI, cloud, and data consulting to
                rigorous technical due diligence, ensuring they remain
                competitive in today’s AI-driven world.
              </p>
            </div>

            {/* Right Content */}
            <div
              className="text-left ml-0 lg:ml-auto"
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
        className="relative py-16 sm:py-24"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              iconSrc="/homepage/2circle.svg"
              iconAlt="Consulting"
              title="Consulting"
              description="We help organizations design and implement AI, cloud and data solutions that drive lasting business impact."
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
        className="py-16 sm:py-24 lg:py-48"
        style={{ backgroundColor: "var(--color-almost-white)" }}
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <p
            className="leading-[110%] font-[var(--font-heading)] text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem]"
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
      <section
        className="py-16 sm:py-24 lg:py-48"
        style={{ background: "var(--gradient-dark)" }}
      >
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
              className="relative px-12 py-4 rounded-lg transition-colors font-['Manrope'] text-button mt-2 overflow-hidden"
              style={{
                background: "var(--gradient-dark)",
                color: "var(--color-mint)",
              }}
            >
              <ShineBorder
                baseColor="var(--color-mint)"
                shineColor={["var(--color-almost-white)", "var(--color-mint)"]}
                duration={15}
                borderWidth={2}
              />
              Get in touch
            </button>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="h-auto lg:h-[500px] flex flex-col lg:flex-row">
        {/* Left side - Background Image */}
        <div className="w-full lg:w-2/5 relative overflow-hidden h-56 sm:h-72 lg:h-auto">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/image copy.png')",
              backgroundPosition: "top right",
            }}
          />
        </div>

        {/* Right side - Content */}
        <div
          className="w-full lg:w-3/5 flex items-center justify-start py-8 lg:py-0"
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
              className="relative px-12 py-4 rounded-lg transition-colors font-['Manrope'] text-button mt-2 overflow-hidden"
              style={{
                background: "var(--gradient-light-reversed)",
                color: "var(--color-dark-green)",
              }}
            >
              <ShineBorder
                baseColor="var(--color-dark-green)"
                shineColor={["var(--color-viridian)", "var(--color-emerald)", "var(--color-dark-green)"]}
                duration={8}
                borderWidth={2}
              />
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

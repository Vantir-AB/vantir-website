"use client";

import Image from "next/image";
import { ShineBorder } from "./ui/shine-border";
import { LightRays } from "./ui/light-rays";
import { useEffect, useState } from "react";

// Service Card Component
interface ServiceCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function ServiceCard({ iconSrc, iconAlt, title, description }: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className="p-8 rounded-xl h-120 relative"
      style={{
        backgroundColor: "var(--color-dark-green)",
      }}
    >
      <LightRays 
        color="var(--color-mint)"
        count={isMobile ? 2 : 5}
        opacity={isMobile ? 0.4 : 0.6}
        speed={isMobile ? 12 : 8}
        blur={isMobile ? 20 : 40}
        width={isMobile ? 30 : 50}
        ambientGlow={isMobile ? 0.1 : 0.2}
      />
      <ShineBorder
        baseColor="var(--color-mint)"
        shineColor={["var(--color-almost-white)", "var(--color-mint)"]}
        duration={3}
        borderWidth={1.5}
      />
      {/* Icon */}
      <div className="absolute top-6 left-6">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={64}
          height={64}
          className="w-24 h-24"
        />
      </div>
      
      {/* Title */}
      <h3 
        className="absolute text-3xl font-bold text-left"
        style={{ 
          color: "var(--color-almost-white)",
          fontWeight: "var(--font-heading)",
          bottom: "45%",
          left: "2rem",
          right: "2rem"
        }}
      >
        {title}
      </h3>
      
      {/* Separator */}
      <div 
        className="absolute h-px"
        style={{ 
          backgroundColor: "var(--color-mint)",
          top: "60%",
          left: "2rem",
          right: "2rem"
        }}
      ></div>
      
      {/* Description */}
      <p 
        className="absolute text-left"
        style={{ 
          color: "var(--color-almost-white)",
          fontWeight: "var(--font-body)",
          top: "65%",
          left: "2rem",
          right: "2rem",
          bottom: "4rem"
        }}
      >
        {description}
      </p>
      
      {/* Learn More Link */}
      <div 
        className="absolute bottom-6 left-8"
      >
        <a 
          href="#"
          className="inline-block text-lg font-medium"
          style={{ 
            color: "var(--color-bright-green)",
            fontWeight: "var(--font-button)"
          }}
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

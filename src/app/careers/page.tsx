"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";
import { LightRays } from "@/components/ui/light-rays";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Careers() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const jobOpenings = [
    {
      title: "Senior AI/ML Engineer",
      location: "Stockholm, Sweden",
      type: "Full-time",
      description: "Lead the development of cutting-edge AI solutions for our clients. You'll work with the latest ML frameworks and help shape the future of AI consulting.",
      requirements: [
        "5+ years experience in machine learning and AI",
        "Strong Python, TensorFlow, PyTorch skills",
        "Experience with cloud platforms (AWS, GCP, Azure)",
        "PhD or equivalent experience in AI/ML"
      ]
    },
    {
      title: "Cloud Solutions Architect",
      location: "Stockholm, Sweden",
      type: "Full-time",
      description: "Design and implement scalable cloud architectures for enterprise clients. Help organizations migrate to the cloud and optimize their infrastructure.",
      requirements: [
        "7+ years cloud architecture experience",
        "Expert knowledge of AWS, Azure, or GCP",
        "Kubernetes and containerization expertise",
        "Strong communication and client-facing skills"
      ]
    },
    {
      title: "Data Science Consultant",
      location: "Stockholm, Sweden",
      type: "Full-time",
      description: "Transform raw data into actionable insights for our clients. Work on diverse projects across industries, from healthcare to finance.",
      requirements: [
        "4+ years data science experience",
        "Proficiency in Python, R, SQL",
        "Experience with data visualization tools",
        "Strong statistical and analytical skills"
      ]
    }
  ];

  const benefits = [
    {
      title: "Competitive Package",
      description: "Top-tier salary, equity participation, and performance bonuses. We believe in rewarding hard work and dedication."},
    {
      title: "Versatile Work",
      description: "We don't believe in rigid work hours. We believe in getting the job done. We trust our employees to manage their time and deliver results."
    },
    {
      title: "Work with the best",
      description: "We don't hire anyone. We hire the best. At Vantir you'll be working with driven and talented people who are passionate about what they do."
    },
    {
      title: "Health & Wellness",
      description: "Working at Vantir means working in a healthy and sustainable environment. We believe in the power of good health and well-being."
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-dark)" }}>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-48">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <AuroraText
                speed={2}
                colors={["var(--color-bright-green)", "var(--color-almost-white)"]}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Join the Team
            </AuroraText>
            <p
              className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--color-almost-white)" }}
            >
              Build the future with us. We're looking for exceptional talent to help shape the next generation of technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-almost-white)" }}
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                color: "var(--color-dark-green)",
                fontWeight: "var(--font-display)",
              }}
            >
              Why Vantir?
            </h2>
          </div>

          <div className="p-8 rounded-xl relative" style={{ backgroundColor: "var(--color-dark-green)" }}>
            <LightRays 
              color="var(--color-mint)"
              count={isMobile ? 3 : 6}
              opacity={isMobile ? 0.4 : 0.6}
              speed={isMobile ? 12 : 8}
              blur={isMobile ? 60 : 50}
              width={isMobile ? 100 : 80}
              ambientGlow={isMobile ? 0.1 : 0.2}
            />
            <ShineBorder
              baseColor="var(--color-emerald)"
              shineColor={["var(--color-dark-green)", "var(--color-viridian)"]}
              duration={20}
              borderWidth={3}
            />
            <div className="relative">
              {/* Vertical divider between columns */}
              <div 
                className="absolute top-0 left-1/2 bottom-0 w-px transform -translate-x-1/2 hidden md:block"
                style={{ background: "linear-gradient(to bottom, transparent, var(--color-mint), transparent)" }}
              ></div>
              
              {/* Horizontal divider between rows */}
              <div 
                className="absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 hidden md:block"
                style={{ background: "linear-gradient(to right, transparent, var(--color-mint), transparent)" }}
              ></div>
              
              <div className="text-left grid grid-cols-1 md:grid-cols-2 gap-8 min-h-76">
                {benefits.map((benefit, index) => (
                  <div key={index} className="relative h-full">
                    <h3
                      className="text-2xl font-bold mb-4 absolute top-4 left-0 right-0"
                      style={{ color: "var(--color-almost-white)" }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-base absolute top-16 left-0 right-0"
                      style={{ color: "var(--color-almost-white)" }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Culture Section */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-dark-green)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{
                  color: "var(--color-almost-white)",
                  fontWeight: "var(--font-display)",
                }}
              >
                Our Culture
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--color-almost-white)" }}
              >
                At Vantir, we believe in the power of exceptional people working together to solve complex problems. We foster an environment of continuous learning, innovation, and collaboration.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: "var(--color-mint)" }}></span>
                  <span style={{ color: "var(--color-almost-white)" }}>Flat organizational structure with direct access to leadership</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: "var(--color-mint)" }}></span>
                  <span style={{ color: "var(--color-almost-white)" }}>Regular team events and company retreats</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: "var(--color-mint)" }}></span>
                  <span style={{ color: "var(--color-almost-white)" }}>Opportunity to work with cutting-edge technologies</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="w-full h-96 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: "url('/image copy.png')",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 sm:py-24 lg:py-48"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
              style={{
                background: "var(--gradient-light-reversed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "var(--color-almost-white)",
                fontWeight: "var(--font-display)",
              }}
            >
              Ready to Join Us?
            </h2>
            <a
              href="/careers"
              className="relative inline-block px-12 py-4 rounded-lg transition-colors font-['Manrope'] text-button mt-2 overflow-hidden"
              style={{
                background: "var(--gradient-light-reversed)",
                color: "var(--color-dark-green)",
              }}
            >
              <ShineBorder
                baseColor="var(--color-viridian)"
                shineColor={["var(--color-viridian)", "var(--color-mint)"]}
                duration={5}
                borderWidth={3}
              />
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

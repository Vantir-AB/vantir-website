"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    <>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center">
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

          {/* Navigation - Centered */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
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
        </div>
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
    </>
  );
}

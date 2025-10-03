"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onError={(e) => {
          console.log('Video failed to load:', e);
          e.currentTarget.style.display = 'none';
        }}
        onLoadedData={() => console.log('Video data loaded')}
      >
        <source src="/vantir webm.webm" type="video/webm" />
        <source src="/vantir-norrsken.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback gradient background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #047857 100%)'
        }}
      ></div>
      
      
      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-center md:justify-start items-center p-4 sm:p-6 md:p-8">
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
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 tracking-tight">
          Consulting. Redefined.
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl max-w-sm sm:max-w-md md:max-w-lg leading-relaxed">
            We're building this out. Check back shortly for updates.
          </p>
        </main>
        
        {/* Footer */}
        <footer className="py-6 px-6 sm:py-8 sm:px-8" style={{ backgroundColor: 'var(--color-dark-green)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-sm sm:text-base" style={{ color: 'var(--color-mint)' }}>
            <p>©2025 Vantir. All Rights Reserved.</p>
            <p>info@vantir.se</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
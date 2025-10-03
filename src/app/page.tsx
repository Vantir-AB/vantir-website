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
        <header className="flex justify-between items-center p-6 md:p-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo-white.png"
              alt="Vantir Logo"
              width={199}
              height={38}
              priority
              draggable={false}
              className="w-auto h-auto object-contain"
            />  
          </div>
          
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-white text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Coming Soon
          </h1>
          <p className="text-white text-lg md:text-xl max-w-md leading-relaxed">
            We're building this out—check back shortly for updates.
          </p>
        </main>
        
        {/* Footer */}
        <footer className="p-6" style={{ backgroundColor: 'var(--color-dark-green)' }}>
          <div className="flex justify-between items-center text-sm" style={{ color: 'var(--color-mint)' }}>
            <p>©2025 Vantir. All Rights Reserved.</p>
            <p>info@vantir.se</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

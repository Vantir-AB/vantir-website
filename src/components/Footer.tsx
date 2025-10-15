import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "var(--color-dark-green)" }}>
      <div className="w-full mx-auto px-8 sm:px-12 md:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-8">
          {/* Left side - Logo */}
          <div className="mb-8 lg:mb-0 lg:flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/logo-mint.png"
                alt="Vantir Logo"
                width={180}
                height={36}
                className="h-9 w-auto"
              />
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            {/* Company Column */}
            <div>
              <h3 className="text-subtitle font-semibold mb-4" style={{ color: "var(--color-bright-green)" }}>
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--color-seafoam)" }}>
                    Consulting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--color-seafoam)" }}>
                    Technical Due Diligence
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--color-seafoam)" }}>
                    Ventures
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "var(--color-seafoam)" }}>
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-subtitle font-semibold mb-4" style={{ color: "var(--color-bright-green)" }}>
                Contact
              </h3>
              <p className="text-sm" style={{ color: "var(--color-seafoam)" }}>
                info@vantir.se
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright at bottom */}
        <div className="pt-4">
          <p className="text-sm" style={{ color: "var(--color-bright-green)" }}>
            ©2025 Vantir. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

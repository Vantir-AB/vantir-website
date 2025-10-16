import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vantir.se"),
  title: "Vantir | AI, Data & Cloud for Critical Missions",
  description:
    "Consultancy - Reimagined. Vantir specializes in action-oriented consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
  verification: {
    google: "WcjCXIcf5UHYAztl45UWiVDhe0hXMzi86p0xZueCGlI",
  },
  keywords: [
    "Vantir",
    "consulting",
    "action-oriented consulting",
    "venture building",
    "critical missions",
    "data",
    "AI",
    "artificial intelligence",
    "cloud",
    "strategy",
    "Sweden",
    "Stockholm",
    "Nordics",
    "technical due diligence",
    "technical due diligence services",
    "technical due diligence company",
    "technical due diligence provider",
    "it konsulter",
    "it consultant",
    "AI konsulter",
    "AI consultant",
  ],
  openGraph: {
    title: "Vantir | AI, Data & Cloud for Critical Missions",
    description:
      "Consultancy - Reimagined. Vantir specializes in action-oriented consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
    type: "website",
    siteName: "Vantir | AI, Data & Cloud for Critical Missions",
    images: [
      {
        url: "/vantir-poster-logo.png",
        width: 1200,
        height: 630,
        alt: "Vantir — Consultancy Reimagined",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantir | AI, Data & Cloud for Critical Missions",
    description:
      "Consultancy - Reimagined. Vantir specializes in action-oriented consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
    images: ["/vantir-poster-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    other: [
      {
        rel: "icon",
        url: "/favicon_dark.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

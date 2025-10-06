import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vantir",
  description:
    "Consultancy - Reimagined. Vantir specializes in action-biased consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
  keywords: [
    "Vantir",
    "consulting",
    "action-biased consulting",
    "venture building",
    "critical missions",
    "data",
    "AI",
    "artificial intelligence",
    "cloud",
    "strategy",
    "Sweden",
    "Nordics",
  ],
  openGraph: {
    title: "Vantir",
    description:
      "Consultancy - Reimagined. Vantir specializes in action-biased consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
    type: "website",
    siteName: "Vantir",
    images: [
      {
        url: "/vantir-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Vantir — Consultancy Reimagined",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantir",
    description:
      "Consultancy - Reimagined. Vantir specializes in action-biased consulting and venture building for critical missions, leveraging data, AI, and cloud technologies.",
    images: ["/vantir-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
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
      <body className={`${manrope.variable} antialiased`}>{children}</body>
    </html>
  );
}

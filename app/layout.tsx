import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "./motion-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://tiahhind.com";
const DESCRIPTION =
  "Full-stack developer building thoughtful digital products that turn ideas into reality. UK-based, available worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tiah Hind | Software Developer",
    template: "%s | Tiah Hind",
  },
  description: DESCRIPTION,
  keywords: [
    "full-stack developer",
    "software engineer",
    "MVP development",
    "startup development",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "UK developer",
  ],
  authors: [{ name: "Tiah Hind", url: SITE_URL }],
  creator: "Tiah Hind",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tiah Hind",
    title: "Tiah Hind | Software Developer",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tiah Hind | Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiah Hind | Software Developer",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tiah Hind",
              url: SITE_URL,
              email: "hello@tiahhind.com",
              jobTitle: "Software Developer",
              description:
                "Full-stack software developer helping early-stage startups turn ideas into real, scalable products.",
              sameAs: ["https://www.linkedin.com/in/tiahhind"],
              knowsAbout: [
                "Full-Stack Development",
                "MVP Development",
                "React",
                "Next.js",
                "TypeScript",
                "React Native",
                "Supabase",
                "Product Strategy",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <MotionProvider>
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 9999,
              opacity: 0.03,
              userSelect: "none",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            >
              <filter id="grain-filter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grain-filter)" />
            </svg>
          </div>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

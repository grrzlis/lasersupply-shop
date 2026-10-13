import type { Metadata } from "next";
import { Spline_Sans, IBM_Plex_Sans } from "next/font/google";
import { VisitorTracker } from "@/components/VisitorTracker";
import "./globals.css";

export const runtime = 'edge';

const splineSans = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LaserSupply.org — Precision Laser Blanks & Materials in Europe",
  description: "Europe's leading supplier of laser engraving blanks, anodized metals, warp-free basswood, and maker accessories. Cognitive fluency & conversion design.",
  verification: {
    google: "6EUetAlOxvy_e_nPfCDZ_1nY20CRmlv5zbJ15npflPw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${splineSans.variable} ${ibmPlex.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}

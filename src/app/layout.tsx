import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VisitorTracker } from "@/components/VisitorTracker";
import "./globals.css";

export const runtime = 'edge';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-WPL6HZXN"
        />
        <script
          id="google-tag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GT-WPL6HZXN');
            `,
          }}
        />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}

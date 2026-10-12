import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cjdropshipping.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudraylaser.com",
      },
      {
        protocol: "https",
        hostname: "**.sculpfun.com",
      },
      {
        protocol: "https",
        hostname: "**.ortur.net",
      },
      {
        protocol: "https",
        hostname: "**.twotrees3d.com",
      },
      {
        protocol: "https",
        hostname: "**.omtechlaser.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "**.alicdn.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

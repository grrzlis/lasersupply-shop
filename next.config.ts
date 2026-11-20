import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: process.env.AZURE_NEXT_BUILD === "1" ? "standalone" : undefined,
  serverExternalPackages: ["pg", "pg-native"],
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
      {
        protocol: "https",
        hostname: "**.aliexpress-media.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    if (process.env.AZURE_NEXT_BUILD === "1") {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "cloudflare:workers": path.join(rootDir, "src/lib/cloudflare-workers-stub.ts"),
        "@cloudflare/next-on-pages": false,
      };
    }
    return config;
  },
};

export default nextConfig;

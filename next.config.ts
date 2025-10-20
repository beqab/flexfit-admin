import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["nyamie.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyamie.com",
      },
    ],
  },
};

export default nextConfig;

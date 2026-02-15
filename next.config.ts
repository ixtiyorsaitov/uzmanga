import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.SUPABASE_URL
          ? new URL(process.env.SUPABASE_URL).hostname
          : "",
      },
    ],
  },
};

export default nextConfig;

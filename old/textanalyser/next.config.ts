import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  experimental: {
    esmExternals: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', process.env.CODESPACE_NAME ? `${process.env.CODESPACE_NAME}-3000.app.github.dev` : ''],
    }
  },
};

export default nextConfig;

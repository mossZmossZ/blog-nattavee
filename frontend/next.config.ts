import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Allow server-side file system operations
  serverExternalPackages: ['gray-matter'],
};

export default nextConfig;

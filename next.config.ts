import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images served from /public (local uploads)
  images: {
    unoptimized: true,
  },
  // Increase upload body size limit to 10MB
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
};

export default nextConfig;

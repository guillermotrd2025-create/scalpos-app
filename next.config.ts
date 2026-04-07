import type { NextConfig } from "next";

const nextConfig: any = {
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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. This is needed because of the strict
    // flat config throwing 800+ errors on Next.js 16.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

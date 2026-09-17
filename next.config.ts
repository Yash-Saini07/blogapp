import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      { hostname: "placehold.co" },
      { hostname: "www.researchgate.net" },
      { hostname: "webloganycar.co.uk" },
      { hostname: "res.cloudinary.com" }, // keep in case of old images
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.vercel-storage.com" },
    ],
  },
};

export default nextConfig;

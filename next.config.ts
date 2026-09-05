import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/sermons",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/sermons/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

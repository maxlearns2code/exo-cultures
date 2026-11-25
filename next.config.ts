import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/games/chromatic-symbiosis",
        destination: "/",
        permanent: false,
      },
      {
        source: "/games/aisah",
        destination: "/",
        permanent: false,
      },
      {
        source: "/games/mana",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

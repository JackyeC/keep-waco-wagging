import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile in the home
  // directory was otherwise being inferred as the root).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cool-dog-owner",
        destination: "/wagclub",
        permanent: true,
      },
      {
        source: "/cool-dog-owner-club",
        destination: "/wagclub",
        permanent: true,
      },
      {
        source: "/the-cool-dog-owner-club",
        destination: "/wagclub",
        permanent: true,
      },
      {
        source: "/waco-wag-club",
        destination: "/wagclub",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

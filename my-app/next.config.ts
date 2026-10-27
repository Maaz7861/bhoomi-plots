import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The home page lives at "/" now; keep old links to /Home working with one permanent hop.
    return [
      { source: '/Home', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

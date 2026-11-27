import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repository sits under a home directory with other lockfiles; pin the
  // bundler root so development and builds always resolve this app's routes.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

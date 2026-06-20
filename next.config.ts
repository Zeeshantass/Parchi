import type { NextConfig } from "next";
import path from "path";

const isCapacitorBuild = process.env.BUILD_TARGET === "capacitor";

const nextConfig: NextConfig = {
  // Static export only for Capacitor APK builds.
  // Vercel deployment uses the default server mode (API routes work there).
  ...(isCapacitorBuild && {
    output: "export",
    images: { unoptimized: true },
  }),
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

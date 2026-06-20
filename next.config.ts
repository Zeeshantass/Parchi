import type { NextConfig } from "next";

const isCapacitorBuild = process.env.BUILD_TARGET === "capacitor";

const nextConfig: NextConfig = {
  // Static export only for Capacitor APK builds.
  // Vercel deployment uses the default server mode (API routes work there).
  ...(isCapacitorBuild && {
    output: "export",
    images: { unoptimized: true },
  }),
  turbopack: {
    // Fix: a package-lock.json in the user home directory makes Turbopack
    // infer the wrong workspace root. process.cwd() is always the project root.
    root: process.cwd(),
  },
};

export default nextConfig;

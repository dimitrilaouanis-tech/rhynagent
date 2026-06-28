import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a sibling lockfile exists in the
  // home dir, which otherwise makes Turbopack infer the wrong root).
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
};

export default nextConfig;

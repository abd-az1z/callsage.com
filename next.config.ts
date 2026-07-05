import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["bufferutil", "utf-8-validate"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore optional ws dependencies that cause issues
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        "utf-8-validate": false,
      };
    }
    return config;
  },
};

export default nextConfig;

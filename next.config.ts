import type { NextConfig } from "next";

const basePath = "/alx-studio";
const assetPrefix = "/alx-studio/";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.2.107"],
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

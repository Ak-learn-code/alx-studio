import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/alx-studio" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.2.107"],
  basePath: isProduction ? basePath : undefined,
  assetPrefix: isProduction ? basePath : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

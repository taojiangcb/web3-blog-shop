import type { NextConfig } from "next";
const TerserPlugin = require("terser-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 性能和兼容性配置
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer, dev, webpack }) => {
    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          parallel: true, // 启用多线程压缩
          terserOptions: {
            compress: true,
            mangle: true,
          },
        })
      );
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);

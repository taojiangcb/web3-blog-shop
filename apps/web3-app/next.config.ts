import type { NextConfig } from "next";
const TerserPlugin = require("terser-webpack-plugin");
const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const { withSentryConfig } = require("@sentry/nextjs");

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
  // swcMinify: true,

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

const sentryConfig = withSentryConfig(nextConfig, {
  org: "d7cd1131a989",
  project: "javascript-nextjs",
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  authToken: process.env.SENTRY_AUTH_TOKEN,

  tunnelRoute: "/monitoring",

  reactComponentAnnotation:{
    enabled:true
  },

  experimental: {
    instrumentationHook: true,
  },
});

export default withBundleAnalyzer(sentryConfig);

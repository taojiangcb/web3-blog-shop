import type { NextConfig } from "next";
const TerserPlugin = require("terser-webpack-plugin");
const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require("webpack").container;

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

    // config.externals.push({
    //   react: "React",
    //   "react-dom": "ReactDOM",
    // });
    config.plugins.push(
      // new ModuleFederationPlugin({
      //   name: "web3",
      //   filename: "static/chunks/remoteEntry.js",
      //   remotes: {
      //     dex: "dex@https://dex-7p1.pages.dev/remoteEntry.js",
      //   },
      //   shared: {
      //     ethers: {
      //       singleton: true,
      //       requiredVersion: deps.ethers,
      //       eager: true,
      //     },
      //     // wagmi: {
      //     //   singleton: true,
      //     //   requiredVersion: deps.wagmi,
      //     //   eager: true,
      //     // },
      //     antd: {
      //       singleton: true,
      //       requiredVersion: deps.antd,
      //       eager: true,
      //     },
      //     "react/jsx-runtime": {
      //       singleton: true,
      //       requiredVersion: deps.react,
      //       eager: true,
      //     },
      //   },
      // })
    );

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);

const { join, resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 输出选项
  output: {
    path: join(__dirname, '../dist'), // 输出目录为项目根目录的上一级的 dist 文件夹
    publicPath: './', // 公共路径，这里设置为根路径
    filename: 'scripts/[name].[contenthash:5].bundle.js', // 输出的 JavaScript 文件名，包含 5 位内容哈希值
    assetModuleFilename: 'images/[name].[contenthash:5][ext]', // 输出的资源文件（如图片）路径和名字，包含 5 位内容哈希值
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小为 250KB
    maxEntrypointSize: 250000, // 最大入口资源大小为 250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true, // 开启代码最小化
    minimizer: [
      // CSS 多线程压缩插件
      new CssMinimizerPlugin({
        parallel: true, // 启用多线程压缩
      }),
      // JavaScript 多线程压缩插件
      new TerserPlugin({
        parallel: true, // 启用多线程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 移除所有 console 语句
          },
          format: {
            comments: false, // 移除所有注释
          },
        },
        extractComments: false, // 不将注释提取到单独的文件中
      }),
    ],
  },
  plugins: [
    // 用于生成 HTML 文件的插件
    new HtmlWebpackPlugin({
      title: 'Yideng', // HTML 文件的标题
      filename: 'index.html', // 输出的 HTML 文件名
      template: resolve(__dirname, '../src/index-prod.html'), // 模板文件路径
      favicon: './public/favicon_logosc/favicon.ico', // 网站图标
    }),
  ],
};
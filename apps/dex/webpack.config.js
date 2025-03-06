const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ThemedProgressPlugin } = require('themed-progress-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const deps = require('./package.json').dependencies;

const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));

const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const isProduction = _mode === 'production';

const webpackBaseConfig = {
  stats: {
    warnings: false, // 设为false关闭警告显示
    errors: true // 只显示错误
  },
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
          options: {
            configFile: resolve(__dirname, isProduction ? './.swcrc.prod' : './.swcrc.dev'),
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connectors': resolve('src/connectors'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    fallback: {
      // stream:require.resolve('string-browserify')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _mode ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _mode ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
    new ThemedProgressPlugin(),
    new BundleAnalyzerPlugin(),
    new ModuleFederationPlugin({
      name: 'dex',
      filename: 'remoteEntry.js',
      exposes: {
        './Swap': './src/components/Swap',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        ethers: {
          singleton: true,
          requiredVersion: deps.ethers,
        },
        wagmi: {
          singleton: true,
          requiredVersion: deps.wagmi,
        },
        antd: {
          singleton: true,
          requiredVersion: deps.antd,

        }
      }
    })
  ]
};

module.exports = merge.default(webpackBaseConfig, _mergeConfig);
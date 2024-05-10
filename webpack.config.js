const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isDev = env.dev === true;

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : false,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      assetModuleFilename: './assets/fonts/[name].[ext]'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        'node-fetch': "isomorphic-fetch",
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/assets/icons",
            to: path.resolve(__dirname, './dist/assets/icons'),
            noErrorOnMissing: true
          },
          {
            from: "./src/assets/images",
            to: path.resolve(__dirname, './dist/assets/images'),
            noErrorOnMissing: true
          }
        ],
      }),
      new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
      new Dotenv()
    ],
    devServer: isDev ? {
      open: true,
      hot: true,
      port: 8080,
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
      historyApiFallback: true
    } : {}
  };
};
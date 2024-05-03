const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
  const isDev = env.dev === true;

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : false,
    entry: './src/index.ts',
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
          test: /\.ts$/i,
          use: 'ts-loader',
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts'],
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
      new CleanWebpackPlugin({cleanStaleWebpackAssets: false})
    ],
    devServer: isDev ? {
      open: true,
      hot: true,
      port: 8080,
      static: {
        directory: path.resolve(__dirname, 'dist')
      }
    } : {}
  };
};
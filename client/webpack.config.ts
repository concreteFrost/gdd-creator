const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

const devServer: DevServerConfiguration = {
  compress: true,
  port: 9000,
  open: true,
  hot: true,
};

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@views": path.resolve(__dirname, "src/views/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@_types": path.resolve(__dirname, "src/types/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.scss$/, // For files with the .module.scss extension
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.scss$/, // For non-module SCSS files (e.g., global styles)
        exclude: /\.module\.scss$/,
        use: [
          "style-loader",
          "css-loader", // No CSS modules for regular SCSS files
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  devtool: "source-map",
  devServer,
};

export default config;

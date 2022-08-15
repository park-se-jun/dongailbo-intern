const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "build.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },{
          test: /\.(png|jpg)$/,
          use:['file-loader']
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed),
      }),
    ],
  };
};

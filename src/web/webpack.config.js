const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    operationRecord: "./src/index.ts",
    "operationRecord.min": "./src/index.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "OperationRecord",
    libraryTarget: "var",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
    usedExports: true,
  },
  devtool: "source-map",
  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "dev")],
    compress: true,
    port: 8989,
    injectClient: false,
  },
};

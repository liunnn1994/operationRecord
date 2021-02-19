const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    operationRecord: "./src/core.ts",
    "operationRecord.min": "./src/core.ts",
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "src/op-rec.common.js") }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "OperationRecord",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
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

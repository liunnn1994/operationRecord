const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "operation record",
    },
    options: {
      template: "public/browser-extension.html",
      entry: "./src/options/main.js",
      title: "设置",
    },
    standalone: {
      template: "public/browser-extension.html",
      entry: "./src/standalone/main.js",
      title: "Standalone",
      filename: "index.html",
    },
    devtools: {
      template: "public/browser-extension.html",
      entry: "./src/devtools/main.js",
      title: "Devtools",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js",
        },
        contentScripts: {
          entries: {
            "content-script": ["src/content-scripts/content-script.js"],
          },
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "src/inject-scripts/", to: "js/inject/" }],
        options: {
          concurrency: 100,
        },
      }),
    ],
  },
};

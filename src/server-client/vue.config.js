module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "管理页面";
      return args;
    });
  },
  devServer: {
    proxy: "http://localhost:8990",
  },
};

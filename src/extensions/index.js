const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");
const prettier = require("prettier");

const action = process.argv[2];
const templatesPath = path.resolve("./", "src", "templates", "views");
const buildPath = path.resolve("./", "dist");
const staticPaths = ["_locales", "css", "img", "js", "manifest.json"];

switch (action) {
  case "dev":
    dev()
      .then(() => {
        console.log("开发环境启动成功。");
      })
      .catch((e) => {
        console.log("开发环境启动失败：", e);
      });
    break;
  case "build":
    build()
      .then(() => {
        console.log("打包成功。");
      })
      .catch((e) => {
        console.log("打包失败：", e);
      });
    break;
  default:
    console.log("未知参数！");
}

async function build() {
  fs.removeSync(buildPath);
  fs.ensureDirSync(buildPath);

  for (let i = 0; i < staticPaths.length; i++) {
    fs.copySync(
      path.resolve("./", "src", staticPaths[i]),
      path.resolve("./", "dist", staticPaths[i])
    );
  }

  // 读取模板文件夹
  const templates = fs.readdirSync(templatesPath);
  for (let i = 0; i < templates.length; i++) {
    const p = templates[i];
    const tp = path.join(templatesPath, p);
    if (fs.statSync(tp).isDirectory()) {
      try {
        const configPath = path.join(tp, "config.json");

        const config = fs.existsSync(configPath)
          ? fs.readJsonSync(configPath)
          : {};
        // 读取入口ejs
        fs.writeFileSync(
          path.join(buildPath, `${p}.html`),
          prettier.format(
            await ejs.renderFile(path.join(tp, "index.ejs"), { config }),
            {
              semi: true,
              parser: "html",
            }
          )
        );
      } catch (e) {
        console.log("模板转换失败：", e);
      }
    }
  }
}
async function dev() {
  await build();
}

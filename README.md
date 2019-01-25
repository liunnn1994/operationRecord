## ✨ 特性

- 录制并回放任意 web 界面中的用户操作 前端封装+后端。
- 开箱即用。
- 支持跨域。

## 🖥 支持环境

- `Linux`,`MacOS`,`Windows`。
- 现代浏览器和 IE11及以上。
- [Electron](http://electron.atom.io/)

## 💽 后端架构

1. 基于[NodeJS](https://nodejs.org)
2. 数据库使用[MySQL](https://www.mysql.com/)
3. 服务框架使用[express4](http://www.expressjs.com.cn/)

## 💻 前端架构

1. 录制基于[rrweb](https://github.com/rrweb-io/rrweb)
2. `http`请求默认依赖[axios](https://www.kancloud.cn/yunye/axios/234845)可配置为[jQuery](http://jquery.com/)以及任何与`jQuery`结构相同的库
3. 回放页面前端框架使用[VUE](https://cn.vuejs.org/)
4. `UI`框架使用[Element](http://element-cn.eleme.io/#/zh-CN)
5. 回放基于[rrewb-player](https://github.com/rrweb-io/rrweb-player)

## 📦 安装

1. 安装[MySQL](https://www.mysql.com/)并配置`./server/mysql.config`里的端口号及用户密码

2. 安装[NodeJS](https://nodejs.org/)

3. 进入项目目录

4. 安装依赖

   ```shell
   npm i #国内使用cnpm
   ```

5. 启动项目

   ```shell
   node server
   ```

   

## 🔨 示例

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>test</title>
    </head>

    <body>
        <h1>test</h1>
        <input type="text">
        <button>测试</button>
        <button>回放</button>
        <script src="./js/axios.min.js"></script>
        <script src="./js/operationRecord.js"></script>
        <script>
            let a = new Record({
                url: 'ip地址+/operationRecord/add',
                name: 'liu',
                projectName: 'testProject',
                msg:'测试信息',
                interval:20000,
                success: function (res) {
                    console.log(res);
                }
            });
        </script>
    </body>

</html>
```

## 📖 目录结构

```
├── .git								
├── .gitignore
├── README.md
├── datas								// 录制数据储存目录
├── node_modules
├── package.json
├── public								// 静态文件目录
├── ├── .DS_Store
├── ├── css								// css文件
├── ├── ├── element.min.css
├── ├── ├── fonts						// 字体文件
├── ├── ├── ├── element-icons.ttf
├── ├── ├── ├── element-icons.woff
├── ├── ├── player.min.css
├── ├── ├── reset.min.css
├── ├── ├── style.css					// 自定义样式
├── ├── index.html
├── ├── js								// js文件
├── ├── ├── axios.min.js
├── ├── ├── element.min.js
├── ├── ├── operationRecord.js
├── ├── ├── player.min.js
├── ├── ├── replay.js
├── ├── ├── vue.js
├── ├── replayer.html
├── readme.js
├── server								// 服务器文件
├── ├── local-zh.config					// 表名中英文对应
├── ├── mysql.config					// mysql配置文件
├── ├── mysql.js						// mysql操作
├── server.js							// server
```

## 🤝 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[提交issue](https://github.com/asdjgfr/operationRecord/issues)




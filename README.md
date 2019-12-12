> 由于本人精力有限，项目大多数用途学习用途并没有人在项目中使用，所以这个项目停止维护了。

## 利用现代浏览器的强大功能还原操作并储存 V1.0.0

![示例图片](https://github.com/asdjgfr/operationRecord/blob/master/demo.gif)

**实测在`windows`下安装最新的`MySQL8.0`会报错，重置密码也不行，原因不明，解决办法是安装[MySQL 5.7.25](https://dev.mysql.com/downloads/mysql/5.7.html#downloads)。`MAC OS`下安装最新版没有问题。**

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

1. 安装[MySQL](https://www.mysql.com/)并配置`./server/mysql.config`里的端口号及用户密码。

2. 导入提供的`./test.sql`文件，每个项目可以建一个表。

3. 安装[NodeJS](https://nodejs.org/)。

4. 进入项目目录。

5. 安装依赖：

   ```shell
   npm i #国内使用cnpm
   ```

6. 启动项目：

   ```shell
   node server
   ```

   

## operationRecord.js参数

```javascript
const record=new Record({
    url: '/operationRecord/add',//后台服务器url，如未修改服务器文件，应为：服务端ip+/operationRecord/add
    name: '不知名的测试人员',//提交人，会显示在统计页面。默认：unknow
    projectName: 'test',//需要连接的表名
    ajaxFn:$,//ajax 提交函数，默认依赖axios，如果项目中使用的是jquery直接写$,可以使用人和和jquery结构一致的ajax库
    msg:'你这东西有bug啊',//提交bug信息，最多255
    isReport:'1',//是否认为上报，1：是，0：否。默认：0
    interval:'2000',//提交间隔，默认10秒，单位ms
    success: function (res) {
        console.log(`成功的回调${res}`);
    },
    error: function (err) {
        console.log(`失败的回调${err}`);
    }
});
//方法
record.destroy(); //销毁
console.log(record) //查看属性
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

打开`http://localhost:9527/`查看结果

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

## 📄 TODO

1. ~~自动引入`rrweb`以及`rrweb-player`最新版。~~ 

   现在使用npm 引入 `rrweb`。

2. ~~`rrweb`与本项目代码分离，使用时自动打包压缩。~~ 

   ./public/js/operationRecord.js`可以看作为稳定版的。`

   `现在每次启动服务时都会询问是否打包，默认否，打包后的文件为`./public/js/operationRecord.min.js`。

   同时你可以单独执行`node tools`来进行打包。

3. ~~更换`MySQL`为其他轻量级数据库。~~

   (本项目对数据库要求不高，`mysql`比较成熟，迁移至`MongoDB`成本过高)

4. 添加已读功能。

5. 完善数据传输部分。

6. 解耦。

## ✔ 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| 14及以上| 18及以上| 6及以上| 15及以上

## 🤝 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[提交pr](https://github.com/asdjgfr/operationRecord/pulls)

[提交issue](https://github.com/asdjgfr/operationRecord/issues)






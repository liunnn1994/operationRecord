<h1 align="center">OpRec</h1>

<p align="center">利用现代浏览器所提供的强大 API 录制，回放并保存任意界面中的用户操作</p>

<p align="center">
  <a href="https://unpkg.com/op-rec@latest" target="_blank">
    <img src="https://img.badgesize.io/https://unpkg.com/op-rec@latest?label=gzip%20size%3A%20JS&compression=gzip" alt="gzip">
  </a>
</p>

[English](https://github.com/asdjgfr/operationRecord) |  简体中文

   * [OpRec](#oprec)
      * [简述](#简述)
      * [特性](#🌟-特性)
      * [支持环境](#✔-支持环境)
      * [安装](#📦-安装)
         * [录制端](#录制端)
         * [管理端](#管理端)
      * [示例](#🔨-示例)
      * [本地开发](#️⌨️-本地开发)
      * [文档](#文档)
         * [内置对象](#内置对象)
         * [构造函数](#构造函数)
         * [配置项](#配置项)
         * [实例属性](#实例属性)
         * [实例方法](#实例方法)
      * [参与共建](#🤝-参与共建)

## 简述

利用现代浏览器的强大`api` _([MediaDevices.getDisplayMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia))_ 录制并回放用户任意界面（不限于浏览器中）的操作，并提供主动上报的功能。

## 🌟 特性

- 🧱 开发：
  - 前端库使用[webpack](https://webpack.js.org/)打包为umd。
  - 后端使用[NestJS](https://docs.nestjs.com/)，全链路开发和设计工具体系。
  - 后端前端页使用[Vue 3](https://v3.vuejs.org/)+[Element Plus](https://element-plus.org/)更现代。
- 📦 开箱即用。
- 🌀 无依赖。
- 🛡 100% TypeScript 开发，尽量规避愚蠢错误。
- ⚙️ 提供管理系统，并可独立使用。

## ✔ 支持环境

- 所有现代浏览器。

| [![IE / Edge](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b4c7fe7a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) IE / Edge | [![Firefox](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b445536a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Firefox | [![Chrome](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b537a517?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Chrome | [![Safari](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b3d25b6f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Safari | [![Opera](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b621d60b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Opera |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE 全版本不支持, Edge 79 及以上                                                                                                                                                           | 66 及以上                                                                                                                                                                             | 72 及以上                                                                                                                                                                           | 13 及以上                                                                                                                                                                           | 60 及以上                                                                                                                                                                         |
## 📦 安装

### 录制端

> 使用 yarn

```shell
yarn add op-rec
```

> 使用 npm

```shell
npm install op-rec --save
```

> 在浏览器中

```html
使用CDN
<script type="text/javascript" src="//unpkg.com/op-rec@latest"></script>
或
<script type="text/javascript" src="op-rec.js"></script>
或
<script type="text/javascript" src="op-rec.min.js"></script>
```

### 管理端

在[Release](https://github.com/asdjgfr/operationRecord/releases)中下载并解压，配置`.env`里面的参数。

安装依赖

```shell
yarn
或
npm i
```

启动

```shell
node main.js
```

## 🔨 示例

- vue

  ```vue
  <template>
    <video controls autoplay ref="video"></video>
  </template>
  
  <script>
  import OpRec from "op-rec";
  export default {
    data() {
      return {};
    },
    mounted() {
      const or = new OpRec();
      or.on("startREC", this.startREC);
    },
    methods: {
      startREC(stream) {
        this.$refs.video.srcObject = stream;
      },
    },
  };
  </script>
  ```

- react

  ```react
  import React from "react";
  import ReactDOM from "react-dom";
  import OpRec from "op-rec";
  
  class App extends React.Component {
    componentDidMount() {
      const or = new OpRec();
      or.on("startREC", this.startREC);
    }
    startRec(stream) {
      ReactDOM.findDOMNode(this.refs.video).srcObject = stream;
    }
    render() {
      return (
        <div>
          <video ref="video" controls autoplay></video>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById("container"));
  ```

- 原生

  ```html
  <script type="text/javascript" src="op-rec.js"></script>
  <body>
    <video controls autoplay></video>
  </body>
  <script>
    const video = document.querySelector("video");
    const or = new OpRec();
    or.on("startREC", function (stream) {
      video.srcObject = stream;
    });
  </script>
  ```

## ⌨️ 本地开发

```shell
$ git clone clone https://github.com/asdjgfr/operationRecord.git
# 开发前端库
$ cd operationRecord/src/op-rec
$ yarn
$ yarn dev
# 开发服务端
$ cd operationRecord/src/server
$ yarn
$ yarn dev
# 开发服务端前端页面
$ cd operationRecord/src/server-client
$ yarn
$ yarn dev
```


## 文档

### 内置对象

**日志等级**

- emerg: 0
- alert: 1
- crit: 2
- err: 3
- warning: 4
- notice: 5
- info: 6
- debug: 7

**LoggerItem**

​    记录对象

- level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

  等级

- content: string

  日志内容

- timestamp: number

  生成日志时的时间戳

### 构造函数

**OpRec()**

创建一个新的录制实例。

### 配置项

**url** <sup>可选</sup>

​    完成后上传的地址，默认为local，地址为local的时候会本地生成并下载。

**fetchConfig** <sup>可选</sup>

​    fetch的配置。

**mediaConstraints** <sup>可选</sup>

​    [mediaConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints)配置。

**mimeType** <sup>可选</sup>

​    mime类型，默认会选择最佳类型。

**lang** <sup>可选</sup>

​    语言，默认zh，暂时只有zh。

**hotKeys** <sup>可选，预留，尚未支持</sup>

​    快捷键。

**dom** <sup>可选</sup>

​    自动生成的dom配置。

- show: boolean
- style:{key:value}

​    dom为false或dom.show为false的时候将不会生成操作的标签。

**onStartREC** <sup>可选</sup>

​    开始录制时的回调，可使用**OpRec.prototype.on("startREC",cb)**替代。

**onStopREC** <sup>可选</sup>

​    结束录制时的回调，可使用**OpRec.prototype.on("stopREC",cb)**替代。

**onPauseREC** <sup>可选</sup>

​    暂停录制时的回调，可使用**OpRec.prototype.on("pauseREC",cb)**替代。

**onResumeREC** <sup>可选</sup>

​    继续录制时的回调，可使用**OpRec.prototype.on("resumeREC",cb)**替代。

### 实例属性

**OpRec.prototype.DOM** （HTMLElement | undefined）

​    用于 ui 操作的 dom，当`DomOptions.show`为`false`的时候返回`undefined`。

**OpRec.prototype.startTime** （number）

​    录制开始时的时间戳，默认为 0。

**OpRec.prototype.status** （"recording" | "stop" | "paused" | "inactive"）

​    当前状态，默认为 stop。

**OpRec.prototype.recordedChunks** （Blob[]）

​    包含媒体数据的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)，默认为 []。

**OpRec.prototype.logs** （LoggerItem[]）

​    记录集合，默认为 []。

**OpRec.prototype.logs** （LoggerItem[]）

​    记录集合，默认为 []。

**OpRec.prototype.mediaRecorder** （MediaRecorder | undefined）

​    MediaRecorder实例。

**OpRec.prototype.stream** （MediaStream | undefined）

​    MediaStream。

**OpRec.prototype.mimeType** （string | undefined）

​    mime类型。

### 实例方法

**OpRec.prototype.startREC()**

​    开始录制，这是一个异步方法。

**OpRec.prototype.stopREC()**

​    结束录制。

**OpRec.prototype.toggleREC()**

​    切换录制状态。

**OpRec.prototype.on(type,cb)**

​    event事件。

**OpRec.prototype.logger(loggerLever,ErrorEvent|string)**

- loggerLever:"emerg" | "alert" | "crit" | "err" | "warning" | "notice" | "info" | "debug" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

​    主动提交记录，第一个参数为记录等级，第二个参数为日志信息。

**OpRec.prototype.getSupportedMimeTypes()**

​    获取当前运行环境支持的Mime类型。

**OpRec.prototype.getBlob()**

​    获取录制后的Blob。

**OpRec.prototype.getExtname()**

​    获取录制的后缀。

**OpRec.prototype.reset()**

​    重置状态。

## 🤝 参与共建

[![PRs Welcome](https://camo.githubusercontent.com/0ff11ed110cfa69f703ef0dcca3cee6141c0a8ef465e8237221ae245de3deb3d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e7376673f7374796c653d666c61742d737175617265)](http://makeapullrequest.com/)
欢迎[PR](https://github.com/asdjgfr/operationRecord/pulls)


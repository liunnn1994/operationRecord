<h1 align="center">OpRec</h1>

<div align="center">利用现代浏览器所提供的强大 API 录制，回放并保存任意界面中的用户操作</div>

[English](https://github.com/asdjgfr/operationRecord) | | 简体中文



# 简述

利用现代浏览器的强大`api` *([MediaDevices.getDisplayMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia))* 录制并回放用户任意界面（不限于浏览器中）的操作，并提供主动上报的功能。

---

## Constructor

**OpRec()**

  创建一个新的录制实例。

---

# 实例属性

**OpRec.prototype.DOM** （HTMLElement | undefined）

​    用于ui操作的dom，当`DomOptions.show`为`false`的时候返回`undefined`。

**OpRec.prototype.startTime** （number）

​    录制开始时的时间戳，默认为0。

**OpRec.prototype.status** （number）

​    录制开始时的时间戳，默认为0。

---

# ✔ 支持环境

现代浏览器。

| [![IE / Edge](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b4c7fe7a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) IE / Edge | [![Firefox](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b445536a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Firefox | [![Chrome](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b537a517?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Chrome | [![Safari](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b3d25b6f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Safari | [![Opera](https://user-gold-cdn.xitu.io/2019/1/30/1689cda8b621d60b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)](http://godban.github.io/browsers-support-badges/) Opera |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE 全版本不支持, Edge 79及以上                               | 66及以上                                                     | 72及以上                                                     | 13及以上                                                     | 60及以上                                                     |

const mysql = require('./server/mysql');
const zh = require('./server/local-zh.config');
//文件模块
const fs = require("fs");

const express = require('express');
const path = require('path'); //系统路径模块
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

//查询所有表名
app.post('/', function (req, res) {
  mysql.getAllTables().then((dataBase) => {
    let msg = [];
    for (let i = 0, len = dataBase.length; i < len; i++) {
      msg.push({
        en: dataBase[i]['TABLE_NAME'],
        zh: zh[dataBase[i]['TABLE_NAME']]
      });
    };
    res.send(msg);
  });
});

//根据表名查询数据
app.get('/operationRecord/query', function (req, res, next) {
  const { Table, page, pageSize } = req.query;
  mysql.query(Table, page, pageSize).then((dataBase) => {
    res.send(dataBase);
  });
});

//添加数据
app.post('/operationRecord/add', function (req, res) {
  //获取ip
  const ip = getClientIp(req);
  //文件名
  const date = new Date().getTime();
  const fileName = `./datas/${date}.json`;
  //接收数据
  const { name, isReport, data, table } = req.query;
  writeJSON(fileName, data);
  mysql.add([name, ip, new Date(), fileName, isReport], table).then((res) => {
    res.send('success');
  });
});

app.listen(port, () => console.log(`服务启动成功!端口号：${port}`));

/**
 * 获取客户端ip
 * @param {request} req 
 */
function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

/**
 * 写文件
 * @param {文件路径以及文件名} fileName 
 * @param {保存的数据} data 
 */
function writeJSON(fileName, rData) {
  fs.writeFile(fileName, rData, () => {
    console.log(`${fileName}写入成功`);
  });
};
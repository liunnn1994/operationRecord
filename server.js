const mysql = require('./server/mysql');
let addItem = ['王五', '123.465.465.456', new Date(), '2.json', false];
// mysql.add(addItem).then((res) => {
//     console.log(res);
// });

const express = require('express');
const path = require('path'); //系统路径模块
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));

//查询所有表名
app.post('/', function (req, res) {
  mysql.getAllTables().then((dataBase) => {
    res.send(dataBase);
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
  res.send('POST request to the homepage')
});

app.listen(port, () => console.log(`服务启动成功!端口号：${port}`));


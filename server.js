const mysql = require('./server/mysql');
let addItem = ['王五', '123.465.465.456', new Date(), '2.json', false];
// mysql.add(addItem).then((res) => {
//     console.log(res);
// });

const express = require('express');
const path = require('path'); //系统路径模块
const app = express();
const port = 3001;

//app.use(express.static(path.join(__dirname, 'public')));

app.get('/operationRecord/query', function (req, res, next) {
  console.log(req.query);
  const Table = 'data';
  mysql.query(Table,1).then((dataBase) => {
    //console.log(dataBase);
    res.send(dataBase);
  });
  
});

app.post('/operationRecord/add', function (req, res) {
  res.send('POST request to the homepage')
});

app.listen(port, () => console.log(`服务启动成功!端口号：${port}`));


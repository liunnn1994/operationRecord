const mysql = require('./server/mysql');
let addItem=['王五', '123.465.465.456', new Date(), '2.json', false];
// mysql.add(addItem).then((res) => {
//     console.log(res);
// });

const express = require('express');
const path = require('path'); //系统路径模块
const app = express();
const port=3000;

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log(`服务启动成功!端口号：${port}`))


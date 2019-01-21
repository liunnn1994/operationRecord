const mysql = require('./mysql');

mysql.add(['李四', '123.465.465.456', new Date(), '2.json', false]).then((res) => {
    console.log(res);
});
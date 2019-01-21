
const mysql = require('mysql');
const databaseConfig = require('./mysql.config');
var connection = mysql.createConnection(databaseConfig);


module.exports = {
  query: function (Table) {
    connection.connect();
    var sql = `SELECT * FROM ${Table}`;
    //查
    const p = new Promise(function (res, rej) {
      connection.query(sql, function (err, result) {
        if (err) {
          rej(err.message);
        } else {
          res(result);
        };
      });
    });
    connection.end();
    return p;
  },
  add: function (params=['','','','','']) {
    connection.connect();
    var addSql = 'INSERT INTO data(Id,name,ip,date,dataFile,isReport) VALUES(0,?,?,?,?,?)';
    const p = new Promise(function (res, rej) {
      connection.query(addSql, params, function (err, result) {
        if (err) {
          rej(err.message);
        } else {
          res(result);
        };
      });
    });
    connection.end();
    return p;
  }
};
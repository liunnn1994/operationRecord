const fs = require("fs"),
    myPath = `${__dirname}/node_modules`,
    pa = fs.readdirSync(myPath),
    reg = /rrweb$/gi;
let rrwebPath = '';
//获取node_modules里面的rrweb
getRrwebPath:
    for (let i = 0, len = pa.length; i < len; i++) {
        if (reg.test(pa[i])) {
            rrwebPath = `${myPath}/${pa[i]}/dist/rrweb.min.js`;
            break getRrwebPath;
        }
        ;
    }
;
const getText = new Promise((res, rej) => {
    fs.readFile(rrwebPath, (err, rr) => {
        fs.readFile('./public/js/operationRecord.js', (error, or) => {
            return res(rr.toString() + or.toString());
        });
    });
});
getText.then((text) => {
    fs.writeFile('./public/js/operationRecord.min.js', text, () => {
        console.log(`operationRecord.min.js写入成功`);
    });
});






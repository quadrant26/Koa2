const fs = require('fs');

var str = "";

for(var i = 0; i < 500; i++ ){
    str += '这个改成www.baidu.com\n'
}
var writeStream = fs.createWriteStream('./data/data.txt');

writeStream.write(str);
// 标记写入完成
writeStream.end();
// 监听写入完成 必须要 标记写入完成
writeStream.on('finish', function (){
    console.log("写入完成");
})
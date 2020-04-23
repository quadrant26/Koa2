const fs = require('fs');

// 管道流 复制文件
var readStream = fs.createReadStream("./aaa.jpg");

var writeSteam = fs.createWriteStream("./bbb.jpg");

readStream.pipe(writeSteam);
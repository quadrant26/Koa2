const fs = require('fs');

// 检测是文件还是目录
fs.stat('./module', function (err, data){
    if( err ){
        console.log(err)
        return;
    }

    console.log(`是文件： ${data.isFile()}`)
    console.log(`是目录： ${data.isDirectory()}`)
})
const fs = require('fs');

// 读取目录
/*
 * filename   string        文件名称
 * callback      回调函数， 参数为 (err, data)
*/
fs.readdir('./css', (err, data) => {
    if( err ){
        console.log(err)
        return;
    }

    console.log(data)
})
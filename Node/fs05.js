const fs = require('fs');

// 读取文件
/*
 * filename   string        文件名称
 * callback      回调函数， 参数为 (err, data)
*/
fs.readFile('./css/base.css', (err, data) => {
    if( err ){
        console.log(err)
        return;
    }

    console.log(data) // Buffer
    console.log(data.toString()) // 将 Buffer 转化为 string
})
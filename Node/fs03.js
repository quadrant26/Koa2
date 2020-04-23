const fs = require('fs');

// 写入文件
/*
 * filename   string        文件名称
 * data  (String | Buffer)  写入的内容
 * options (Object)     option 数组
    ? encoding (string)   可选值 默认 utf-8
    ? mode (number) 文件读写权限 默认 438
    ? flag (string) 默认值 w
 * callback      回调函数， 参数为 异常 err
*/
fs.writeFile('./css/style.css', "hello, nodejs", (err) => {
    if( err ){
        console.log(err)
        return;
    }

    console.log("写入成功");
})
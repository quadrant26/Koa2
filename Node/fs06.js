const fs = require('fs');

// rename
// todo 1. 表示重命名
// todo 2. 移动
/*
 * filename   string        文件名称
 * newFilename string 修改后的文件名称
 * callback      回调函数， 参数为 (err, data)
*/

// todo 重命名
fs.rename("./css/base.css", './css/index.css', function (err){
    if( err ){
        console.log(err)
        return;
    }

    console.log("文件重命名成功");
})


// todo 移动
fs.rename("./css/base.css", './html/index.css', function (err){
    if( err ){
        console.log(err)
        return;
    }

    console.log("移动文件成功");
})
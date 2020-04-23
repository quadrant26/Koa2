const fs = require('fs');

// unlink
/*
 * filename   string        文件名称
 * callback      回调函数， 参数为 (err, data)
*/

// ! 不能删除非空目录
fs.unlink("./css/index.html", (err) => {
    if( err ){
        console.log(err)
        return;
    }

    console.log("删除文件成功");
})

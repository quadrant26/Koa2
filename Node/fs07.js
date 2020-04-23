const fs = require('fs');

// rmdir
/*
 * filename   string        文件名称
 * callback      回调函数， 参数为 (err, data)
*/

// ! 不能删除非空目录
fs.rmdir("./css", function (err){
    if( err ){
        console.log(err)
        return;
    }

    console.log("删除目录成功");
})

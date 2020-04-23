const fs = require('fs');

// 创建目录
/*
 * path          创建的目录路径
 * mode          目录权限（读写权限） 默认777
 * callback      回调函数， 参数为 异常 err
*/
fs.mkdir('./css', (err) => {
    if(err){
        console.log(err);
        return;
    }

    console.log("创建成功")
})
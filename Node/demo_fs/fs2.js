// 判断服务器上有没有 upload 目录， 如果没有则创建，如果有的话不做操作

const mkdirp = require('mkdirp');

mkdirp('./upload', function (err) {
    if(err){
        console.log(err)
    }
})

// * 简写
mkdirp('./upload');


// * 一次生成多级目录
mkdirp('./aa/bb/cc', function (err){
    if(err){
        console.log(err)
    }
})
// wwwroot 文件夹下有 images css js 以及 index.html 找出 wwwroot 目录下所有的目录，然后放到一个数组中

const fs = require('fs');
var path = './wwwroot';

/*
fs.readdir(path, (err, data) => {
    if( err ){
        console.log(err);
        return;
    }

    console.log(data);
    // 错误的写法， fs里的方法是异步的
    var arrDir = [];
    for(var i = 0; i < data.length; i++ ){
        fs.stat(path+'/'+data[i], (error, stats) => {
            if( stats.isDirectory()){
                arrDir.push(path+'/'+data[i])
            }
        })
    }

    console.log(arrDir);
}) */

var dirArr = [];
fs.readdir(path, (err, data) => {
    if(err){
        console.log(err)
        return
    }

    (function getDir(i){

        if( i == data.length){
            // 执行完成
            console.log(dirArr);
            return;
        }

        fs.stat(path+'/'+data[i], (error, stats) => {
            if( stats.isDirectory()){
                dirArr.push(data[i])
            }
            getDir(i+1)
        })
    })(0)
})

console.log(dirArr)
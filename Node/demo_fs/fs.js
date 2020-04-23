// 判断服务器上有没有 upload 目录， 如果没有则创建，如果有的话不做操作

const fs = require('fs');
var path = './upload';

fs.stat(path, (err, data) => {
    if(err){
        mkdir(path);
        return;
    }

    if( data.isDirectory() ){
        console.log("目录已经存在");
    }else{
        // 首先删除文件，再去创建
        fs.unlink(path, (err) => {
            if(!err){
                mkdir(path);
            }else{
                console.log("请检测传入的数据是否正确");
            }
        })
        
    }
})


function mkdir(dir){
    fs.mkdir(dir, (err) => {
        if(err){
            console.log(err)
            return;
        }
    })
}
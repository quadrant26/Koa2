const fs = require('fs');

// todo 1. 定义一个方法 判断是一个资源文件还是目录
async function isDir(path){

    return new Promise( (resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if( error ){
                console.log(error)
                return
            }
    
            if( stats.isDirectory() ){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    })
}

// todo 2. 获取 wwwroot 里面的所有资源
function main (){
    var path = './wwwroot'
    var dirArr = [];
    fs.readdir(path, async (err, data) => {
        if(err){
            console.log(err)
            return;
        }

        for(var i = 0; i < data.length; i++){
            if( await isDir(path + '/' + data[i])){
                dirArr.push(data[i])
            }
        }

        console.log(dirArr)
    })
}

main();
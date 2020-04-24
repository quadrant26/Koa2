const fs = require('fs');
const path = require('path');
const url = require('url');

// 私有方法
let getFileMimeSync = function (extname){
    var data = fs.readFileSync('./module/mime.json');
    let mimeJSON = JSON.parse(data.toString());
    return mimeJSON[extname];
}

// http://127.0.0.1:3000/login.html
// http://127.0.0.1:3000/index.html
exports.static = function (request, response, staticPath){
    // 1. 获取地址
    let pathname = url.parse(request.url).pathname;
    pathname = pathname == "/" ? "/index.html" : pathname; 
    let extname = path.extname(pathname);
    
    // 2. 通过 fs 获取文件
    if ( pathname != "/favicon.ico"){

        try{
            let data = fs.readFileSync('./' + staticPath + pathname);
            if( data ){
                let mime = getFileMimeSync(extname);
                response.writeHead(200, {"Content-type":`${mime};charset='utf-8'`})
                response.end(data);
            }
        }catch (e){

        }

        /*
        fs.readFile('./' + staticPath+pathname, async (err, data) => {
            if( err ){
                response.writeHead(404, {"Content-type":"text/html;charset='utf-8'"});
                response.write("<head><meta charset='utf-8'/></head>")
                response.end("404这个页面不存在");
            }

            let mime = getFileMimeSync(extname);
            response.writeHead(200, {"Content-type":`${mime};charset='utf-8'`})
            response.end(data);
        })*/
    }
}
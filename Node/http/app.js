const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const common = require('./module/common');

// common.getFileMime('.json');

http.createServer(function (request, response) {

    // http://127.0.0.1:3000/login.html
    // http://127.0.0.1:3000/index.html

    // 1. 获取地址
    let pathname = url.parse(request.url).pathname;
    pathname = pathname == "/" ? "/index.html" : pathname; 
    let extname = path.extname(pathname);

    // 2. 通过 fs 获取文件
    if ( pathname != "/favicon.ico"){
        fs.readFile('./static' + pathname, async (err, data) => {
            if( err ){
                response.writeHead(404, {"Content-type":"text/html;charset='utf-8'"});
                response.write("<head><meta charset='utf-8'/></head>")
                response.end("404这个页面不存在");
            }

            // let mime = common.getMime(extname);
            // let mime = await common.getFileMime(extname);
            let mime = common.getFileMimeSync(extname);
            // console.log(mime)
            response.writeHead(200, {"Content-type":`${mime};charset='utf-8'`})
            response.end(data);
        })
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
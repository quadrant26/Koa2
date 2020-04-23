const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {

    // http://127.0.0.1:3000/login.html
    // http://127.0.0.1:3000/index.html

    // 1. 获取地址
    let pathname = request.url;
    console.log(pathname);

    // 2. 通过 fs 获取文件
    if ( pathname != "/favicon.ico"){
        
        fs.readFile('./static' + pathname, (err, data) => {
            if( err ){
                response.writeHead(404, {"Content-type": "text/html;charset='utf-8'"});
                response.end("这个页面不存在");
            }

            response.writeHead(200, {"Content-type": "text/html;charset='utf-8'"})
            response.end(data);
        })
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
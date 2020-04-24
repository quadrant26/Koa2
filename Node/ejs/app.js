const http = require('http');
const routes = require('./module/routes');
const url = require('url');

http.createServer(function (request, response) {

    // 创建静态web服务
    routes.static(request, response, 'static');

    // 路由
    let pathName = url.parse(request.url).pathname;

    if( pathName == '/login'){
        response.writeHead(200, {"Content-type":`text/html;charset='utf-8'`})
        response.end("Login");
    } else if (pathName == '/reg'){
        response.writeHead(200, {"Content-type":`text/html;charset='utf-8'`})
        response.end("reg");
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
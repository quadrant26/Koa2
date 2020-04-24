const http = require('http');
const routes = require('./module/routes');

http.createServer(function (request, response) {

    // 创建静态web服务
    routes.static(request, response, 'static');

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
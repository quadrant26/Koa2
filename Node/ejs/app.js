const http = require('http');
const routes = require('./module/routes');
const url = require('url');
const ejs = require('ejs')

http.createServer(function (request, response) {

    // 创建静态web服务
    routes.static(request, response, 'static');

    // 路由
    let pathName = url.parse(request.url).pathname;

    if( pathName == '/login'){

        let msg = '数据库获取的数据';
        let list = [
            {title: "新闻111"},
            {title: "新闻222"},
            {title: "新闻333"},
            {title: "新闻444"},
            {title: "新闻555"}
        ]
        ejs.renderFile('./views/login.ejs', {
            msg: msg,
            list: list
        }, (err, data) => {
            response.writeHead(200, {"Content-type":`text/html;charset='utf-8'`})
            response.end(data);
        })
        
    } else if (pathName == '/reg'){
        response.writeHead(200, {"Content-type":`text/html;charset='utf-8'`})
        response.end("reg");
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
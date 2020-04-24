const http = require('http');
const routes = require('./module/routes');
const url = require('url');
const ejs = require('ejs')

http.createServer(function (request, response) {

    // 创建静态web服务
    routes.static(request, response, 'static');

    // 路由
    let pathName = url.parse(request.url).pathname;

    // 获取请求的类型
    console.log(request.method);

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
        
    }else if ( pathName == '/news'){
        // 获取get 传值
        var query = url.parse(request.url, true).query;
        console.log(query)

        response.writeHead(200, {"Content-type":"text/html;charset='utf-8'"})
        response.end("get传值成功")

    } else if ( pathName == '/form'){
        ejs.renderFile('./views/form.ejs', {}, (err, data) => {
            if( err){
                console.log(err);
                return;
            }

            response.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
            response.end(data);
        })
    }else if ( pathName == '/doLogin'){
        ejs.renderFile('./views/form.ejs', {}, (err, data) => {
            if( err){
                console.log(err);
                return;
            }

            // 获取 post 传值
            var postData = "";
            request.on("data", function (chunkdata){
                postData += chunkdata;
            })
            request.on("end", function (){
                console.log(postData)
            })

            response.writeHead(200, {"Content-type": "text/html; charset='utf-8'"});
            response.end("post ok");
        })
    } else if (pathName == '/reg'){
        response.writeHead(200, {"Content-type":`text/html;charset='utf-8'`})
        response.end("reg");
    }

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');